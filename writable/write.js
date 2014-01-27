var Promise = require('bluebird')

module.exports = write

function write(streamState, data) {
    var promise
    if (streamState.state === 'writable') {
        promise = new Promise()
        streamState.state = 'waiting'
        streamState.writablePromise = promise
        doNextWrite({ type: 'data', promise: promise})
    }
}
