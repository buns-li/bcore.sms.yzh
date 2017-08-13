// const https = require('https')

// const querystring = require('querystring')

const { URL } = require('url')

const request = require('request')

module.exports = function(url, headers, bodyData) {

    //URL to Options

    url = new URL(url)

    let options = {
        uri: url.href,
        protocol: url.protocol,
        hostname: url.hostname,
        hash: url.hash,
        search: url.search,
        pathname: url.pathname,
        path: `${url.pathname}${url.search}`,
        href: url.href
    }

    if (url.port !== '') {
        options.port = Number(url.port)
    }

    options.method = 'POST'

    options.headers = headers

    options.body = bodyData
    options.json = true
    options.timeout = 10000

    return new Promise((resolve, reject) => {
        request(options, (err, resp, body) => {

            if (body && body.resp && (body.resp.respCode === '000000')) {
                return resolve(body.resp.templateSMS)
            } else {
                return reject(err || body)
            }
        })
    })

    // let callback
    // let promise = new Promise((resolve, reject) => {
    //     callback = function(...args) {

    //         let err = args.shift()

    //         if (err) return reject(err)

    //         return resolve(...args)
    //     }
    // })

    // let req = https.request(options, res => {

    //     console.log(res.statusCode)

    //     let datas = ''

    //     res.on('data', chunk => {
    //         console.log('chunk:', chunk)
    //         datas += chunk.toString()
    //     })

    //     res.on('end', function() {
    //         console.log(datas)
    //         callback && callback(null, datas)
    //     })

    //     res.on('error', err => {
    //         console.log(err)
    //         callback && callback(err)
    //     })
    // })

    // req.write(querystring.stringify(bodyData))

    // req.end()

    // return promise
}