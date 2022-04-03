import axios from 'axios'
import Chalk from 'chalk'
import { RateLimiter } from 'limiter'

const lmt = new RateLimiter({
    tokensPerInterval: 30,
    interval: 'second',
})

export const useSendVideo = async (
    token: string,
    video: string,
    caption: string | undefined,
    chat_ids: string[]
) => {
    let success = 0
    const start = Date.now()
    console.log(`local: Start sending video...`)

    for (const index in chat_ids) {
        await lmt.removeTokens(1)
        try {
            const q = await axios({
                url: `https://api.telegram.org/bot${token}/sendVideo`,
                method: 'post',
                data: {
                    chat_id: chat_ids[index],
                    video: video,
                    caption: caption,
                },
            })
            const res = await q.data
            if (res.ok) {
                success++
            }
        } catch (e) {
            console.log(Chalk.dim(e))
        }
        console.log(
            `local: Sending video to ${chat_ids[index]} ${(
                ((Number(index) + 1) / chat_ids.length) *
                100
            ).toFixed(2)}% (${Number(index) + 1}/${chat_ids.length}), done.`
        )
    }

    const end = Date.now()
    console.log(
        Chalk.green(
            `\nSuccessfully completed the sending task: (${success}/${
                chat_ids.length
            }), ${((end - start) / (1000 * chat_ids.length)).toFixed(
                2
            )}/s, done.`
        )
    )
}

export default useSendVideo
