import { RateLimiter } from "limiter"
import axios from "axios";

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendVideo = async (token: string, video: string, caption: string | undefined, chat_id: string) => {
    await limiter.removeTokens(1)
    const q = await axios( {
        url: `https://api.telegram.org/bot${token}/sendVideo`,
        method: 'post',
        data: {
            chat_id: chat_id,
            video: video,
            caption: caption
        },
    })
    const res = await q.data
    console.log(res)
}

export default useSendVideo