import axios from 'axios-https-proxy-fix'
import Chalk from 'chalk'
import {RateLimiter} from 'limiter'

const lmt = new RateLimiter({
    tokensPerInterval: 30,
    interval: 'second',
})

const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/)
const proxy = process.env.http_proxy
const result = (proxy || '').match(reg)

export const useSendVideo = async (
    token: string,
    video: string,
    caption: string | undefined,
    chat_ids: string[]
) => {
    const start = Date.now()
    console.log(`local: Start sending video...`)
    
    for (const index in chat_ids) {
        await lmt.removeTokens(1)
        axios({
            url: `https://api.telegram.org/bot${token}/sendVideo`,
            method: 'post',
            data: {
                chat_id: chat_ids[index],
                video: video,
                caption: caption,
            },
            proxy: proxy ? {
                host: result ? result[2] : 'localhost',
                port: result ? Number(result[3].slice(1)) : 80,
            } : false
        }).catch(()=>{
        })
        console.log(
            `local: Sending video to ${chat_ids[index]} ${(
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

export default useSendVideo
