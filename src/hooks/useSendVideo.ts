import { RateLimiter } from "limiter"

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendVideo = async (token: string, video: string, caption: string | undefined, chat_id: string) => {
    await limiter.removeTokens(1)
    console.log(token, video, caption, chat_id)
}

export default useSendVideo