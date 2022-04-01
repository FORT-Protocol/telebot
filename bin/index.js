#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
// name, version, global-option
program
    .name('telebot')
    .version('1.0.0')
    .option('-T, --token', 'telegram bot token');
// send-message
program
    .command('send-message [chat_id...]')
    .alias('sm')
    .description('send message to user')
    .option('--text <text>', 'send text')
    .option('--file <file>', 'chat_ids file')
    .action((chat_id, options) => {
    console.log(`text: ${options.text}`);
    console.log(`file: ${options.file}`);
    console.log(`user: ${chat_id}`);
})
    .addHelpText('after', `
Examples:
  $ telebot send-message chat_id1 --text hello
  $ telebot send-message chat_id1 chat_id2 --text hello
  `);
// send-video
program
    .command('send-video [chat_id...]')
    .alias('sv')
    .option('--video <video>', 'send video uri')
    .option('--caption <caption>', 'send caption')
    .option('--file <file>', 'chat_ids file')
    .description('send video to chat_id user')
    .action((chat_id, options) => {
    console.log(`video: ${options.video}`);
    console.log(`caption: ${options.caption}`);
    console.log(`file: ${options.file}`);
    console.log(`user: ${chat_id}`);
})
    .addHelpText('after', `
Examples:
  $ telebot send-video chat_id1 --video hello
  $ telebot send-video chat_id1 chat_id2 --video "https://xxoo.mp4" --caption hello
  `);
// send-photo
program
    .command('send-photo [chat_id...]')
    .alias('sp')
    .option('--photo <photo>', 'send photo uri')
    .option('--caption <caption>', 'send caption')
    .option('--file <file>', 'chat_ids file')
    .description('send photo to chat_id user')
    .action((chat_id, options) => {
    console.log(`photo: ${options.photo}`);
    console.log(`caption: ${options.caption}`);
    console.log(`file: ${options.file}`);
    console.log(`user: ${chat_id}`);
})
    .addHelpText('after', `
Examples:
  $ telebot send-photo chat_id1 --photo "https://xxoo.jpg"
  $ telebot send-photo chat_id1 chat_id2 --photo "https://xxoo.jpg" --caption hello
  `);
program.parse(process.argv);
//# sourceMappingURL=index.js.map