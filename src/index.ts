#! /usr/bin/env node
import send_message from './commands/send_message.js'
import send_video from './commands/send_video.js'
import send_photo from './commands/send_photo.js'
import send from './commands/send.js'
import { createCommand } from 'commander'
import { useGetMe } from './hooks/useGetMe.js'

const telebot = createCommand()

telebot
    .name('telebot')
    .version('0.2.0')
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
  $ telebot send
  `
    )

telebot
    .command('sendmessage <text> [chat_ids...]')
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
  $ telebot sendmessage 'hello' chat_id1 chat_id2
  `
    )

telebot
    .command('sendvideo <video> [chat_ids...]')
    .description('send video')
    .option(
        '--caption <caption>',
        'video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing'
    )
    .option('-y, --yes', 'confirmed', false)
    .action(async (video: string, chat_ids: string[], options: any) => {
        const token = telebot.getOptionValue('token')
        await send_video(token, video, chat_ids, options.caption, options.yes)
    })
    .addHelpText(
        'after',
        `
Examples:
  $ telebot sendvideo 'uri' chat_id1 chat_id2 --caption 'hello'
  `
    )

telebot
    .command('sendphoto <photo> [chat_ids...]')
    .description('send photo')
    .option(
        '--caption <caption>',
        'photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing'
    )
    .option('-y, --yes', 'confirmed', false)
    .action(async (photo: string, chat_ids: string[], options: any) => {
        const token = telebot.getOptionValue('token')
        await send_photo(token, photo, chat_ids, options.caption, options.yes)
    })
    .addHelpText(
        'after',
        `
Examples:
  $ telebot send-photo 'uri' chat_id1 chat_id2 --caption 'hello'
  `
    )

telebot
    .command('getme')
    .description('easy send via bot')
    .action(async () => {
        const token = telebot.getOptionValue('token')
        await useGetMe(token)
    })
    .addHelpText(
        'after',
        `
Examples:
  $ telebot getme
  `
    )

telebot.parse(process.argv)
