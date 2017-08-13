const bcore = require('bcore')

const crypto = require('crypto')

const request = require('./request')

/**
 * 将时间字符串转换成14位的数字
 * @param date
 * @returns {string}
 */
function dateToLong(date) {
    let arr = []
    arr.push(date.getFullYear())
    arr.push('0' + (date.getMonth() + 1))
    arr.push('0' + date.getDate())
    arr.push('0' + date.getHours())
    arr.push('0' + date.getMinutes())
    arr.push('0' + date.getSeconds())
    for (let i = 1, l = arr.length; i < l; i++) {
        arr[i] = arr[i].substr(arr[i].length - 2)
    }
    return parseInt(arr.join(''), 10)
}

function requestPath(softVersion, accountSid, accountToken, fnName, operation) {

    let sig = accountSid + accountToken + dateToLong(new Date())

    sig = crypto.createHash('md5').update(sig).digest('hex').toUpperCase()

    if (fnName && operation) {
        return `https://api.ucpaas.com/${softVersion}/Accounts/${accountSid}/${fnName}/${operation}?sig=${sig}`
    }
    return `https://api.ucpaas.com/${softVersion}/Accounts/${accountSid}?sig=${sig}`
}

function base64Authorization(accountSid) {
    return new Buffer(accountSid + ':' + dateToLong(new Date())).toString('base64')
}

bcore.on('ucpass', {
    accountSid: '',
    accountToken: '',
    appId: '',
    softVersion: '2014-06-30'
}, function() {

    this.__init = function(options) {
        this.opts = options
    }

    /**
     * 发送SMS验证码短信
     *
     * @param {String} to 要发送到的手机号
     * @param {String} templateId 验证码短信模板
     * @param {String} randomCode 验证码
     * @return {Promise}
     */
    this.sendSMS = function(to, templateId, randomCode) {

        let opts = this.opts

        let url_path = requestPath(opts.softVersion, opts.accountSid, opts.accountToken, 'Messages', 'templateSMS')

        let bodyData = JSON.stringify({
            templateSMS: {
                appId: opts.appId,
                templateId: templateId,
                to: to,
                param: randomCode
            }
        })

        return request(url_path, {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
            'Content-Length': Buffer.byteLength(bodyData),
            'Authorization': base64Authorization(opts.accountSid)
        })
    }


    /**
     * 发送SMS验证码短信
     *
     * @param {String} to 要发送到的手机号
     * @param {String} templateId 验证码短信模板
     * @param {String} randomCode 验证码
     * @return {Promise}
     */
    this.sendVoiceSMS = function(to, templateId, randomCode) {

        let opts = this.opts

        let url_path = requestPath(opts.softVersion, opts.accountSid, opts.accountToken, 'Calls', 'voiceVerify')

        let bodyData = JSON.stringify({
            templateSMS: {
                appId: opts.appId,
                templateId: templateId,
                to: to,
                param: randomCode
            }
        })

        return request(url_path, {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Content-Length': Buffer.byteLength(bodyData),
            'Authorization': base64Authorization(opts.accountSid)
        })
    }
})