var Promise = require("bluebird")

module.exports = abort

function abort(streamState, reason) {
    // NON STANDARD
    if (streamState.readableState === "finished") {
        throw new Error("cannot abort finished stream")
    // NON STANDARD
    } else if (streamState.readableState === "errored") {
        throw new Error("cannot abort errored stream")
    }

    streamState.onAbort(reason)
    streamState.finishedPromise._fulfill(undefined)
    // should this be errored ?
    streamState.readableState = "finished"

    if (streamState.readableState === "waiting") {
        // Question: should `reason` be cast to an `Error` object
        // if it's a string
        streamState.readablePromise._reject(reason)
    } else if (streamState.readableState === "readable") {
        streamState.readablePromise = Promise.rejected(reason)
        streamState.buffer.length = 0
    }
}
