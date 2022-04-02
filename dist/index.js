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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var send_message_1 = __importDefault(require("./commands/send_message"));
var send_video_1 = __importDefault(require("./commands/send_video"));
var send_photo_1 = __importDefault(require("./commands/send_photo"));
var send_1 = __importDefault(require("./commands/send"));
var telebot = (0, commander_1.createCommand)();
// name, version, global-option
telebot
    .name('telebot')
    .version('1.0.0')
    .option('-T, --token [token]', 'telegram bot token');
telebot
    .command('send')
    .description('easy send via bot')
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, send_1.default)()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// send-message
telebot
    .command('send-message <text> [chat_ids...]')
    .alias('message')
    .description('send message to user')
    .action(function (text, chat_ids, options) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = telebot.getOptionValue('token');
                if (!(chat_ids.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, send_message_1.default)(token, text, chat_ids)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                console.log(chalk_1.default.green('Send message over:'), chalk_1.default.red('0 user'));
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })
    .addHelpText('after', "\nExamples:\n  $ telebot send-message 'hello' chat_id1 chat_id2\n  ");
// send-video
telebot
    .command('send-video <video> [chat_ids...]')
    .alias('video')
    .option('--caption <caption>', 'video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing')
    .description('send video to chat_id user')
    .action(function (video, chat_ids, options) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = telebot.getOptionValue('token');
                if (!(chat_ids.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, send_video_1.default)(token, video, chat_ids, options.caption)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                console.log(chalk_1.default.green('Send video over:'), chalk_1.default.red('0 user'));
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })
    .addHelpText('after', "\nExamples:\n  $ telebot send-video 'uri' chat_id1 chat_id2 --caption 'hello'\n  ");
// send-photo
telebot
    .command('send-photo <photo> [chat_ids...]')
    .alias('photo')
    .option('--caption <caption>', 'photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing')
    .option('--file <file>', 'chat_ids file')
    .description('send photo to chat_id user')
    .action(function (photo, chat_ids, options) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = telebot.getOptionValue('token');
                if (!(chat_ids.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, send_photo_1.default)(token, photo, chat_ids, options.caption)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                console.log(chalk_1.default.green('Send photo over:'), chalk_1.default.red('0 user'));
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); })
    .addHelpText('after', "\nExamples:\n  $ telebot send-photo 'uri' chat_id1 chat_id2 --caption 'hello'\n  ");
telebot.parse(process.argv);
//# sourceMappingURL=index.js.map