var assert = require('assert')

var error = require('./error.js')
var doClose = require('./do-close.js')

module.exports = doNextWrite

function doNextWrite(streamState, triplet) {
    var type = triplet.type
    var promise = triplet.promise
    var data = triplet.data

    if (type === 'close') {
        assert(streamState.state === 'closing', 
            'Cannot close stream that is not in closing state')
        return doClose(streamState)
    }

    assert(type === 'data', 'cannot write type that is not data')

    streamState.currentWritePromise = promise
    // NON STANDARD - try catch is stupid.
    // if onWrite throws thats not my problem, I refuse to
    // handle that case.
    streamState.onWrite(
        data,
        signalDone, 
        error.bind(null, streamState)
    )

    function signalDone() {
        if (streamState.currentWritePromise !== promise) {
            return
        }

        currentWritePromise = undefined

        if (streamState.state === 'waiting') {
            promise._fulfill(undefined)
            if (streamState.buffer.length !== 0) {
                var entry = streamState.buffer.shift()
                doNextWrite(streamState, entry)
            } else {
                streamState.state = 'writable'
                streamState.writablePromise._fulfill(undefined)
            }
        } else if (streamState.state === 'closing') {
            promise._fulfill(undefined)
            if (streamState.buffer.length !== 0) {
                var entry = streamState.buffer.shift()
                doNextWrite(streamState, entry)
            }
        }
    }
}
