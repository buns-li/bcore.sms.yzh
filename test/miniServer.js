const MiniServer = require('bcore/lib/mini-server-center')

module.exports = function(obj) {
    return MiniServer.load('testApp', 'ucpass', {
        accountSid: '云之讯平台的账号SID',
        accountToken: '云之讯平台的Token',
        appId: '应用id'
    }).then(() => {
        MiniServer.injection('testApp', obj)
    })
}