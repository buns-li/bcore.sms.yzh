const Should = require('should')

const miniSrv = require('./miniServer')

const UCPass = require('./ucpass')

let testObj = new UCPass()

require('../index')

process.on('unhandledRejection', (reason, p) => {
    console.warn('Unhandled Rejection at: Promise ', p, ' reason: ', reason)
})

process.on('uncaughtException', function(err) {
    console.error('An uncaught error occurred!')
    console.error(err.stack)
})

miniSrv(testObj)
    .then(() => {
        testObj.sendValidCode('15021431294', 32073, 123456)
            .then(data => {
                console.log('data:', data)
            })
            .catch(err => {
                console.log(err)
            })
    })

// describe('bcore.ucpass test', function() {

//     before(done => {
//         miniSrv(testObj).then(() => { done() })
//     })

//     it('"respCode" should return "000000"', function(done) {

//         testObj.sendValidCode('15021431294', 32073, 123456)
//             .then(data => {

//                 Should(data).have.property('respCode')

//                 data.respCode.should.be.equal('000000')

//                 done()
//             })
//             .catch(err => {
//                 done(err)
//             })
//     })

// })