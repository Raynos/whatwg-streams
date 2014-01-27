var Promise = require("bluebird")

module.exports = abort

function abort(streamState, reason) {
    // NON STANDARD
    if (streamState.state === "finished") {
        throw new Error("cannot abort finished stream")
    // NON STANDARD
    } else if (streamState.state === "errored") {
        throw new Error("cannot abort errored stream")
    }

    streamState.onAbort(reason)
    streamState.closedPromise._fulfill(undefined)
    // should this be errored ?
    streamState.state = "finished"

    if (streamState.state === "waiting") {
        // Question: should `reason` be cast to an `Error` object
        // if it's a string
        streamState.readablePromise._reject(reason)
    } else if (streamState.state === "readable") {
        streamState.readablePromise = Promise.rejected(reason)
        streamState.buffer.length = 0
    }
}
