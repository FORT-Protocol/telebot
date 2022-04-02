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
            type: 'confirm',
            name: 'confirm',
            message: 'Is now to send message?',
            default: true,
            when: !confirmed
        },
    ];
    console.log(confirmed);
    const q = yield inquirer_1.default.prompt(questions);
    const answers = yield q;
    if (!token) {
        token = answers.token;
    }
    if (confirmed || answers.confirm) {
        console.log(`token:${token}`);
        console.log(`method:${answers.method}`);
        return;
    }
    console.log('Cancel the job!');
});
exports.send = send;
exports.default = exports.send;
//# sourceMappingURL=send.js.map