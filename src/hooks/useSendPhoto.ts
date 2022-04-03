import axios from 'axios-https-proxy-fix'
import Chalk from 'chalk'
import {RateLimiter} from 'limiter'

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: 'second',
})

const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/)
const proxy = process.env.http_proxy
const result = (proxy || '').match(reg)

export const useSendPhoto = async (
    token: string,
    photo: string,
    caption: string | undefined,
    chat_ids: string[]
) => {
    const start = Date.now()
    console.log(`local: Start sending photo...`)
    
    for (const index in chat_ids) {
        await limiter.removeTokens(1)
        axios({
            url: `https://api.telegram.org/bot${token}/sendPhoto`,
            method: 'post',
            data: {
                chat_id: chat_ids[index],
                photo: photo,
                caption: caption,
            },
            proxy: proxy ? {
                host: result ? result[2] : 'localhost',
                port: result ? Number(result[3].slice(1)) : 80,
            } : false
        }).catch(()=>{
        })
        console.log(
            `local: Sending photo to ${chat_ids[index]} ${(
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

export default useSendPhoto
