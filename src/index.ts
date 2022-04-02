#! /usr/bin/env node
import { createCommand } from 'commander'
import Chalk from 'chalk'
import send_message from './commands/send_message'
import send_video from './commands/send_video'
import send_photo from './commands/send_photo'
import send from './commands/send'

const telebot = createCommand()

telebot
    .name('telebot')
    .version('0.1.0')
    .option('-T, --token [token]', 'telegram bot token')

telebot
    .command('send')
    .description('easy send via bot')
    .option('-y, --yes', 'confirmed', false)
    .action(async (options) => {
        const token = telebot.getOptionValue('token')
        await send(token, options.yes)
    })
    .addHelpText(
        'after',
        `
Examples:
  $ tb send
  $ telebot send
  `
    )

telebot
    .command('send-message <text> [chat_ids...]')
    .alias('message')
    .description('send message to user')
    .option('-y, --yes', 'confirmed', false)
    .action(async (text, chat_ids, options) => {
        const token = telebot.getOptionValue('token')
        if (chat_ids.length > 0) {
            await send_message(token, text, chat_ids, options.yes)
        } else {
            console.log(Chalk.green('Send message over:'), Chalk.red('0 user'))
        }
    })
    .addHelpText(
        'after',
        `
Examples:
  $ tb message 'hello' chat_id1 chat_id2
  $ telebot send-message 'hello' chat_id1 chat_id2
  `
    )

telebot
    .command('send-video <video> [chat_ids...]')
    .alias('video')
    .description('send video to chat_id user')
    .option(
        '--caption <caption>',
        'video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing'
    )
    .option('-y, --yes', 'confirmed', false)
    .action(async (video, chat_ids, options) => {
        const token = telebot.getOptionValue('token')
        if (chat_ids.length > 0) {
            await send_video(token, video, chat_ids, options.caption, options.yes)
        } else {
            console.log(Chalk.green('Send video over:'), Chalk.red('0 user'))
        }
    })
    .addHelpText(
        'after',
        `
Examples:
  $ tb video 'uri' chat_id1 chat_id2 --caption 'hello'
  $ telebot send-video 'uri' chat_id1 chat_id2 --caption 'hello'
  `
    )

telebot
    .command('send-photo <photo> [chat_ids...]')
    .alias('photo')
    .description('send photo to chat_id user')
    .option(
        '--caption <caption>',
        'photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing'
    )
    .option('-y, --yes', 'confirmed', false)
    .action(async (photo, chat_ids, options) => {
        const token = telebot.getOptionValue('token')
        if (chat_ids.length > 0) {
            await send_photo(token, photo, chat_ids, options.caption, options.yes)
        } else {
            console.log(Chalk.green('Send photo over:'), Chalk.red('0 user'))
        }
    })
    .addHelpText(
        'after',
        `
Examples:
  $ tb photo 'uri' chat_id1 chat_id2 --caption 'hello'
  $ telebot send-photo 'uri' chat_id1 chat_id2 --caption 'hello'
  `
    )

telebot.parse(process.argv)
