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
exports.send = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const send = (token, confirmed) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = [
        {
            type: 'input',
            name: 'token',
            message: 'Bot Token:',
            when: !token
        },
        {
            type: 'list',
            name: 'method',
            message: 'Which to choose to send?',
            choices: ['Message', 'Video', 'Photo'],
            default: 0
        },
        {
            type: 'editor',
            name: 'text',
            message: 'Input the text to send:',
            when: (answers) => {
                return answers.method === 'Message';
            }
        },
        {
            type: 'input',
            name: 'video',
            message: 'Input the video uri:',
            when: (answers) => {
                return answers.method === 'Video';
            }
        },
        {
            type: 'input',
            name: 'photo',
            message: 'Input the photo uri:',
            when: (answers) => {
                return answers.method === 'Photo';
            }
        },
        {
            type: 'confirm',
            name: 'hasCaption',
            message: 'Add caption?',
            default: true,
            when: (answers) => {
                return answers.method === 'Photo' || answers.method === 'Video';
            }
        },
        {
            type: 'editor',
            name: 'caption',
            message: 'Input the caption:',
            when: (answers) => {
                return (answers.method === 'Photo' || answers.method === 'Video') && answers.hasCaption;
            }
        },
        {
            type: 'editor',
            name: 'chat_ids',
            message: 'Input the chat_ids:'
        },
        {
            type: 'confirm',
            name: 'confirmed',
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
    if (confirmed || answers.confirmed) {
        console.log(`token:${token}`);
        switch (answers.method) {
            case 'Message':
                console.log('text:', answers.text);
                console.log('chat_ids:', answers.chat_ids);
                break;
            case 'Video':
                console.log('video:', answers.video);
                if (answers.caption) {
                    console.log('caption', answers.caption);
                }
                console.log('chat_ids:', answers.chat_ids);
                break;
            case 'Photo':
                console.log('photo:', answers.photo);
                if (answers.caption) {
                    console.log('caption', answers.caption);
                }
                console.log('chat_ids:', answers.chat_ids);
                break;
            default:
                console.log('Error method!');
        }
        return;
    }
    console.log('Cancel the job!');
});
exports.send = send;
exports.default = exports.send;
//# sourceMappingURL=send.js.map