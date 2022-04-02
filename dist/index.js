#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const send_message_1 = __importDefault(require("./commands/send_message"));
const send_video_1 = __importDefault(require("./commands/send_video"));
const send_photo_1 = __importDefault(require("./commands/send_photo"));
const send_1 = __importDefault(require("./commands/send"));
const telebot = (0, commander_1.createCommand)();
telebot
    .name('telebot')
    .version('1.0.0')
    .option('-T, --token [token]', 'telegram bot token');
telebot
    .command('send')
    .description('easy send via bot')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, send_1.default)();
}))
    .addHelpText('after', `
Examples:
  $ tb send
  $ telebot send
  `);
telebot
    .command('send-message <text> [chat_ids...]')
    .alias('message')
    .description('send message to user')
    .action((text, chat_ids) => __awaiter(void 0, void 0, void 0, function* () {
    const token = telebot.getOptionValue('token');
    if (chat_ids.length > 0) {
        yield (0, send_message_1.default)(token, text, chat_ids);
    }
    else {
        console.log(chalk_1.default.green('Send message over:'), chalk_1.default.red('0 user'));
    }
}))
    .addHelpText('after', `
Examples:
  $ tb message 'hello' chat_id1 chat_id2
  $ telebot send-message 'hello' chat_id1 chat_id2
  `);
telebot
    .command('send-video <video> [chat_ids...]')
    .alias('video')
    .option('--caption <caption>', 'video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing')
    .description('send video to chat_id user')
    .action((video, chat_ids, options) => __awaiter(void 0, void 0, void 0, function* () {
    const token = telebot.getOptionValue('token');
    if (chat_ids.length > 0) {
        yield (0, send_video_1.default)(token, video, chat_ids, options.caption);
    }
    else {
        console.log(chalk_1.default.green('Send video over:'), chalk_1.default.red('0 user'));
    }
}))
    .addHelpText('after', `
Examples:
  $ tb video 'uri' chat_id1 chat_id2 --caption 'hello'
  $ telebot send-video 'uri' chat_id1 chat_id2 --caption 'hello'
  `);
telebot
    .command('send-photo <photo> [chat_ids...]')
    .alias('photo')
    .option('--caption <caption>', 'photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing')
    .description('send photo to chat_id user')
    .action((photo, chat_ids, options) => __awaiter(void 0, void 0, void 0, function* () {
    const token = telebot.getOptionValue('token');
    if (chat_ids.length > 0) {
        yield (0, send_photo_1.default)(token, photo, chat_ids, options.caption);
    }
    else {
        console.log(chalk_1.default.green('Send photo over:'), chalk_1.default.red('0 user'));
    }
}))
    .addHelpText('after', `
Examples:
  $ tb photo 'uri' chat_id1 chat_id2 --caption 'hello'
  $ telebot send-photo 'uri' chat_id1 chat_id2 --caption 'hello'
  `);
telebot.parse(process.argv);
//# sourceMappingURL=index.js.map