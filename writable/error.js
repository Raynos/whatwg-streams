module.exports = error

function error(streamState, reason) {
    // what if reason is not an instanceof Error ???
    var state = streamState.state

    // NON STANDARD
    if (state === 'closed' || state === 'errored') {
        throw new Error('cannot error() a stream in state ' +
            state)
    }

    streamState.writablePromise._reject(reason)
    streamState.closedPromise._reject(reason)
    streamState.buffer.forEach(function (triplet) {
        triplet.promise._reject(reason)
    })
    streamState.storedError = reason
    streamState.state = 'errored'
}
