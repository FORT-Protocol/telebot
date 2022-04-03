import {RateLimiter} from "limiter"
import axios from "axios";
import Chalk from "chalk";

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendMessage = async (token: string, text: string, chat_id: string) => {
    await limiter.removeTokens(1)
    try {
        const q = await axios({
            url: `https://api.telegram.org/bot${token}/sendMessage`,
            method: 'post',
            data: {
                chat_id: chat_id,
                text: text,
            }
        })
        const res = await q.data
        return {
            username: res.result.chat.username ?? undefined,
            ok: res.ok
        }
    } catch (e) {
        console.log(Chalk.dim(e))
        return {
            username: undefined,
            ok: false
        }
    }
}

export default useSendMessage