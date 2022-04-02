import {RateLimiter} from "limiter"
import axios from "axios";

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendMessage = async (token: string, text: string, chat_id: string) => {
    await limiter.removeTokens(1)
    const q = await axios({
        url: `https://api.telegram.org/bot${token}/sendMessage`,
        method: 'post',
        data: {
            chat_id: chat_id,
            text: text,
        }
    })
    const res = await q.data
    console.log(res)
}

export default useSendMessage