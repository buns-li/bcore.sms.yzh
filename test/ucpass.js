module.exports = class UCPass {
    constructor() {}

    /**
     * 发送验证码
     */
    sendValidCode(mobile, tplId, code) {
        return this.msrv.ucpass.sendSMS(mobile, tplId, code)
    }

    /**
     * 发送语音验证码
     */
    sendValidVoiceCode(mobile, tplId, code) {
        return this.msrv.ucpass.sendVoiceSMS(mobile, tplId, code)
    }
}