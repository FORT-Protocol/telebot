#! /usr/bin/env node
import send_message from './commands/send_message.js'
import send_video from './commands/send_video.js'
import send_photo from './commands/send_photo.js'
import send from './commands/send.js'
import { createCommand } from 'commander'

const telebot = createCommand()

telebot
    .name('telebot')
    .version('0.1.4')
    .option('-T, --token [token]', 'telegram bot token')

telebot
    .command('send')
    .description('easy send via bot')
    .option('-y, --yes', 'confirmed', false)
    .action(async (options: any) => {
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
    .description('send message')
    .option('-y, --yes', 'confirmed', false)
    .action(async (text: string, chat_ids: string[], options: any) => {
        const token = telebot.getOptionValue('token')
        await send_message(token, text, chat_ids, options.yes)
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
    .description('send video')
    .option(
        '--caption <caption>',
        'video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing'
    )
    .option('-y, --yes', 'confirmed', false)
    .action(async (video: string, chat_ids: string[], options: any) => {
        const token = telebot.getOptionValue('token')
        await send_video(
            token,
            video,
            chat_ids,
            options.caption,
            options.yes
        )
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
    .description('send photo')
    .option(
        '--caption <caption>',
        'photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing'
    )
    .option('-y, --yes', 'confirmed', false)
    .action(async (photo: string, chat_ids: string[], options: any) => {
        const token = telebot.getOptionValue('token')
        await send_photo(
            token,
            photo,
            chat_ids,
            options.caption,
            options.yes
        )
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
