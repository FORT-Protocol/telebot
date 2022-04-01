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
    .option('-v, --video <video>', 'video uri or video id');
// command: send
commander_1.program
    .command('send [chat_id]', 'send message to named chat_id, or all if no chat_id supplied')
    .description('send message or photo or video')
    .action((chat_id) => {
    const options = commander_1.program.opts();
    console.log(`bot: ${options.token}`);
    console.log(`send message: ${options.text}`);
    console.log(`send video: ${options.video}`);
    console.log(`send photo: ${options.photo}`);
    console.log(`send mode: ${options.mode}`);
    console.log(`send caption: ${options.caption}`);
    console.log(`to user: ${chat_id}`);
});
// custom help
commander_1.program
    .addHelpText('after', `
Example call:
  $ telebot -T <token> send -t "hello world" 28390273
  $ telebot -T <token> send -v "https://xxoo.avi" -f chat_ids.csv
`);
commander_1.program
    .parse();
//# sourceMappingURL=index.js.map