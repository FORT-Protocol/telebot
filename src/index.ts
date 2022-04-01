#! /usr/bin/env node
import { Command } from 'commander'
import Chalk from 'chalk'
import { mess_send_message, send_message } from './send_message'
import { mess_send_video, send_video } from './send_video'
import { mess_send_photo, send_photo } from './send_photo'

const program = new Command()

// name, version, global-option
program
    .name('telebot')
    .version('1.0.0')
    .option('-T, --token', 'telegram bot token')

// send-message
program
    .command('send-message <text> [chat_ids...]')
    .alias('message')
    .description('send message to user')
    .option('--file <file>', 'chat_ids file')
    .action((text, chat_ids, options) => {
        if (chat_ids.length > 0) {
            send_message(text, chat_ids)
        } else if (options.file) {
            mess_send_message()
        } else {
            console.log(Chalk.green('Send message over:'), Chalk.red('0 user'))
        }
    })
    .addHelpText(
        'after',
        `
Examples:
  $ telebot send-message 'hello' chat_id1
  $ telebot send-message 'hello' chat_id1 chat_id2
  $ telebot send-message 'hello' --file './chat_ids.csv'
  `
    )

// send-video
program
    .command('send-video <video> [chat_ids...]')
    .alias('video')
    .option(
        '--caption <caption>',
        'video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing'
    )
    .option('--file <file>', 'chat_ids file')
    .description('send video to chat_id user')
    .action((video, chat_ids, options) => {
        if (chat_ids.length > 0) {
            send_video(video, chat_ids, options.caption)
        } else if (options.file) {
            mess_send_video()
        } else {
            console.log(Chalk.green('Send video over:'), Chalk.red('0 user'))
        }
    })
    .addHelpText(
        'after',
        `
Examples:
  $ telebot send-video 'uri' chat_id1
  $ telebot send-video 'uri' chat_id1 chat_id2 --caption 'hello'
  $ telebot send-video 'uri' --caption "hello" --file './chat_ids.csv'
  `
    )

// send-photo
program
    .command('send-photo <photo> [chat_ids...]')
    .alias('photo')
    .option(
        '--caption <caption>',
        'photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing'
    )
    .option('--file <file>', 'chat_ids file')
    .description('send photo to chat_id user')
    .action((photo, chat_ids, options) => {
        if (chat_ids.length > 0) {
            send_photo(photo, chat_ids, options.caption)
        } else if (options.file) {
            mess_send_photo()
        } else {
            console.log(Chalk.green('Send photo over:'), Chalk.red('0 user'))
        }
    })
    .addHelpText(
        'after',
        `
Examples:
  $ telebot send-photo 'uri' chat_id1
  $ telebot send-photo 'uri' chat_id1 chat_id2 --caption 'hello'
  $ telebot send-photo 'uri' --caption 'hello' --file './chat_ids.csv'
  `
    )

program.parse(process.argv)
