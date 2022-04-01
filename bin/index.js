#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
// name, description, version
commander_1.program
    .name('telebot')
    .description('A program for telegram bot.')
    .version('1.0.0');
// options
commander_1.program
    .option('-T, --token <token>', `telegram bot's token`)
    .option('-f, --file <file>', 'file path')
    .option('-t, --text <text>', 'text')
    .option('-c, --text <caption>', 'caption')
    .option('-p, --photo <photo>', 'photo uri or photo id')
    .option('-v, --video <video>', 'video uri or video id')
    .option('-m, --mess', 'mess send mode');
// command: send
commander_1.program
    .command('send [chat_id]')
    .description('send message or photo or video')
    .action((chat_id) => {
    const options = commander_1.program.opts();
    console.log(`bot: ${options.token}`);
    console.log(`send message: ${options.text}`);
    console.log(`send video: ${options.video}`);
    console.log(`send photo: ${options.photo}`);
    console.log(`send mode: ${options.mode}`);
    console.log(`to user: ${chat_id}`);
});
commander_1.program
    .parse();
//# sourceMappingURL=index.js.map