import { RateLimiter } from "limiter"
import fetch from 'node-fetch'

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendVideo = async (token: string, video: string, caption: string | undefined, chat_id: string) => {
    await limiter.removeTokens(1)
    const q = await fetch(`https://api.telegram.org/bot${token}/sendVideo`, {
        method: 'POST',
        body: JSON.stringify({
            chat_id: chat_id,
            video: video,
            caption: caption
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const res = await q.json()
    console.log(res)
}

export default useSendVideo