var Promise = require("bluebird")

module.exports = error

function error(streamState, err) {
    // NON STANDARD
    if (streamState.state === "errored") {
        throw new Error("cannot error() a stream in errored state")
    // NON STANDARD
    } else if (streamState.state === "finished") {
        throw new Error("cannot error() a stream in finished state")
    }

    streamState.storedError = err
    streamState.closedPromise._reject(err)
    streamState.state = "errored"

    // Question: check err is instanceof Error ???
    if (streamState.state === "waiting") {
        streamState.readablePromise._reject(err)
    } else if (streamState.state === "readable") {
        streamState.buffer = []
        streamState.readablePromise = Promise.rejected(err)
    }
}
