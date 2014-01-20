var callPull = require("./call-pull.js")

module.exports = waitForReadable

function waitForReadable(streamState) {
    if (streamState.readableState === "waiting") {
        callPull(streamState)
    }

    return streamState.readablePromise
}
