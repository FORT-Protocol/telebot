const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/)
const httpProxy = process.env.http_proxy
const result = (httpProxy || '').match(reg)

export const proxyConfig = httpProxy
    ? {
          host: result ? result[2] : '',
          port: Number(result ? result[3].slice(1) : 80),
      }
    : false
