var Promise = require("bluebird")

module.exports = error

function error(streamState, err) {
    // NON STANDARD
    if (streamState.readableState === "errored") {
        throw new Error("cannot error() a stream in errored state")
    // NON STANDARD
    } else if (streamState.readableState === "finished") {
        throw new Error("cannot error() a stream in finished state")
    }

    streamState.storedError = err
    streamState.finishedPromise._reject(err)
    streamState.readableState = "errored"

    // Question: check err is instanceof Error ???
    if (streamState.readableState === "waiting") {
        streamState.readablePromise._reject(err)
    } else if (streamState.readableState === "readable") {
        streamState.buffer = []
        streamState.readablePromise = Promise.rejected(err)
    }
}
