import axios from 'axios'
import Chalk from 'chalk'
import {RateLimiter} from 'limiter'

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: 'second',
})

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
        try {
            axios({
                url: `https://api.telegram.org/bot${token}/sendPhoto`,
                method: 'post',
                data: {
                    chat_id: chat_ids[index],
                    photo: photo,
                    caption: caption,
                },
            })
        } catch (e) {
            console.log(Chalk.dim(e))
        }
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
            `\nSuccessfully completed the sending task. Spend Time ${((end - start)/1000).toFixed(2)}s, ${((chat_ids.length) * 1000 / (end - start)).toFixed(
                2
            )}/s, done.`
        )
    )
}

export default useSendPhoto
