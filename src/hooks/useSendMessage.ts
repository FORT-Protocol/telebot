import axios from 'axios-https-proxy-fix'
import Chalk from 'chalk'
import {RateLimiter} from 'limiter'
import {proxyConfig} from "../utils/proxyConfig.js";

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: 'second',
})

export const useSendMessage = async (
    token: string,
    text: string,
    chat_ids: string[]
) => {
    const start = Date.now()
    console.log(`local: Start sending message...`)
    
    for (const index in chat_ids) {
        await limiter.removeTokens(1)
        axios({
            url: `https://api.telegram.org/bot${token}/sendMessage`,
            method: 'post',
            data: {
                chat_id: chat_ids[index],
                text: text,
            },
            proxy: proxyConfig
        }).catch(()=>{
        })
        console.log(
            `local: Sending message to ${chat_ids[index]} ${(
                ((Number(index) + 1) / chat_ids.length) *
                100
            ).toFixed(2)}% (${Number(index) + 1}/${chat_ids.length}), ${
                ((Number(index) + 1) * 1000 / (Date.now() - start)).toFixed(2)
            }/s, done.`
        )
    }
    
    const end = Date.now()
    console.log(
        Chalk.green(
            `\nSuccessfully completed the sending task. Spend time ${((end - start)/1000).toFixed(2)} seconds, ${((chat_ids.length) * 1000 / (end - start)).toFixed(
                2
            )}/s, done.`
        )
    )
}

export default useSendMessage
