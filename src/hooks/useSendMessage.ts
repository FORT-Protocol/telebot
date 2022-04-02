import { RateLimiter } from "limiter"

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: "second",
});

export const useSendMessage = async (token: string, text: string, chat_id: string) => {
    await limiter.removeTokens(1)
    console.log(token, text, chat_id)
}

export default useSendMessage