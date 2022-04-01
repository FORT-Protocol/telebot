#! /usr/bin/env node
const { program } = require('commander');

// name, description, version
program
    .name('telebot')
    .description('A program for telegram bot.')
    .version('1.0.0')

// options
program
    .option('-m --mode [mode]', 'send message mode, mess or single')
    .option('-t, --token [token]', `telegram bot's token`)


// command: sendMessage
program
    .command('sendMessage <text> [chat_id]')
    .description('send message via telegram bot')
    .action((text, chat_id) => {
        const options = program.opts();
        console.log(`bot token: ${options.token}`)
        console.log(`sendMessage: ${text}`)
        console.log(`to user: ${chat_id}`)
    })

program
    .command('sendVideo <video> [chat_id]')
    .description('send video via telegram bot')
    .action((video, chat_id) => {
        const options = program.opts();
        console.log(`bot token: ${options.token}`)
        console.log(`sendVideo: ${video}`)
        console.log(`to user: ${chat_id}`)
    })

program
    .command('sendPhoto <photo> [chat_id]')
    .description('send photo via telegram bot')
    .action((photo, chat_id) => {
        const options = program.opts();
        console.log(`bot token: ${options.token}`)
        console.log(`sendVideo: ${photo}`)
        console.log(`to user: ${chat_id}`)
    })

program
    .parse()



