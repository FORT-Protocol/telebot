import { RateLimiter } from 'limiter'
import axios from 'axios-https-proxy-fix'
import { proxyConfig } from '../utils/proxyConfig.js'

const limiter = new RateLimiter({
    tokensPerInterval: 30,
    interval: 'second',
})

export const useGetMe = async (token: string) => {
    console.log(`local: Start get bot information...`)
    await limiter.removeTokens(1)
    return await axios({
        url: `https://api.telegram.org/bot${token}/getMe`,
        method: 'post',
        timeout: 3000,
        proxy: proxyConfig,
    })
        .then((res) => res.data)
        .catch((err) => {
            console.log(err.toString())
            return false
        })
}
