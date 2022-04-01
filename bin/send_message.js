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
exports.send_message = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const send_message = (token, text, chat_ids) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = [
        {
            type: "input",
            message: "Input bot token",
            name: "token",
            default: ""
        }
    ];
    let bot = token;
    if (!token) {
        const q = yield inquirer_1.default.prompt(questions);
        const answers = yield q;
        bot = answers.token;
    }
    console.log('token:', bot);
    console.log('text:', text);
    console.log('chat_ids:', chat_ids);
});
exports.send_message = send_message;
exports.default = exports.send_message;
//# sourceMappingURL=send_message.js.map