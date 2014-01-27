var error = require('./error.js')
var doNextWrite = require('./do-next-write.js')

module.exports = constructor

function constructor(streamState, start) {
    var startedPromise = start()

    startedPromise.then(onFulfill, onReject)

    function onFulfill() {
        if (streamState.buffer.length === 0) {
            streamState.state = 'writable'
            streamState.writablePromise._fulfill()
        } else {
            var entry = streamState.buffer.shift()
            doNextWrite(streamState, entry)
        }
    }

    function onReject(reason) {
        error(streamState, reason)
    }
}
