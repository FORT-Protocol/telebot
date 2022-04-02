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
exports.send_video = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const send_video = (token, video, chat_ids, caption, confirmed) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = [
        {
            type: 'input',
            name: 'token',
            message: 'Bot Token:',
            when: !token
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Is now to send message?',
            default: true,
            when: !confirmed
        },
    ];
    const q = yield inquirer_1.default.prompt(questions);
    const answers = yield q;
    if (!token) {
        token = answers.token;
    }
    if (confirmed || answers.confirm) {
        console.log(token);
        console.log(video);
        console.log(caption);
        console.log(chat_ids);
        return;
    }
    console.log('Cancel this send job!');
});
exports.send_video = send_video;
exports.default = exports.send_video;
//# sourceMappingURL=send_video.js.map