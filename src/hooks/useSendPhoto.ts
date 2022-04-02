import { RateLimiter } from "limiter"
import fetch from 'node-fetch'

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendPhoto = async (token: string, photo: string, caption: string | undefined, chat_id: string) => {
    await limiter.removeTokens(1)
    const q = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: 'POST',
        body: JSON.stringify({
            chat_id: chat_id,
            photo: photo,
            caption: caption
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const res = await q.json()
    console.log(res)
}

export default useSendPhoto