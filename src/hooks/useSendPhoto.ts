import { RateLimiter } from "limiter"
import axios from "axios";

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendPhoto = async (token: string, photo: string, caption: string | undefined, chat_id: string) => {
    await limiter.removeTokens(1)
    const q = await axios( {
        url: `https://api.telegram.org/bot${token}/sendPhoto`,
        method: 'post',
        data: {
            chat_id: chat_id,
            photo: photo,
            caption: caption
        },
    })
    const res = await q.data
    return {
        username: res?.result?.chat?.username ?? undefined,
        ok: res?.ok ?? false
    }
}

export default useSendPhoto