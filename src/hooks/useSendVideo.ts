import axios from "axios";
import Chalk from "chalk";
import {RateLimiter} from "limiter";


const lmt = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendVideo = async (token: string, video: string, caption: string | undefined, chat_id: string) => {
    await lmt.removeTokens(1)
    try {
        const q = await axios({
            url: `https://api.telegram.org/bot${token}/sendVideo`,
            method: 'post',
            data: {
                chat_id: chat_id,
                video: video,
                caption: caption
            },
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

export default useSendVideo