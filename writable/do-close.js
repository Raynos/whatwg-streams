var Promise = require('bluebird')

var error = require('./error.js')

module.exports = doClose

function doClose(streamState) {
    streamState.writablePromise._reject(
        new Error('stream has been closed'))
    // NON STANDARD - do not wrap onClose in try catch
    // that's bullshit, if it needs to do error handling
    // then pass this.[[error]] in as an argument
    var closeResult = Promise.cast(streamState.onClose())

    closeResult.then(onFulfill, onReject)

    return streamState.closedPromise

    function onFulfill() {
        streamState.state = 'closed'
        streamState.closedPromise._fulfill(undefined)
    }

    function onReject(err) {
        error(streamState, err)
    }
}
