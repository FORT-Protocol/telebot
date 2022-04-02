import { RateLimiter } from "limiter"

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});


export const useSendPhoto = async (token: string, photo: string, caption: string | undefined, chat_id: string) => {
    await limiter.removeTokens(1)
    console.log(token, photo, caption, chat_id)
}

export default useSendPhoto