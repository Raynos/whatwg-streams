var assert = require("assert")
var Promise = require("bluebird")

var callPull = require("./call-pull.js");

module.exports = read

function read(streamState) {
    if (streamState.readableState === "waiting") {
        throw new Error("no data available yet")
    } else if (streamState.readableState === "errored") {
        throw streamState.storedError
    } else if (streamState.readableState === "finished") {
        throw new Error("stream has been completely read")
    }

    assert(streamState.buffer.length !== 0, "buffer is empty")
    var data = streamState.buffer.shift()

    if (streamState.buffer.length === 0) {
        if (streamState.draining) {
            streamState.finishedPromise._fulfill(undefined)
            streamState.readablePromise =
                Promise.rejected(new Error("stream has been completely read"))
            streamState.readableState = "finished"
        } else {
            streamState.readableState = "waiting"
            streamState.readablePromise = new Promise()
            callPull(streamState)
        }
    }

    return data
}
