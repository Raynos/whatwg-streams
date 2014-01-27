var assert = require("assert")
var Promise = require("bluebird")

var callPull = require("./call-pull.js");

module.exports = read

function read(streamState) {
    if (streamState.state === "waiting") {
        throw new Error("no data available yet")
    } else if (streamState.state === "errored") {
        throw streamState.storedError
    } else if (streamState.state === "finished") {
        throw new Error("stream has been completely read")
    }

    assert(streamState.buffer.length !== 0, "buffer is empty")
    var data = streamState.buffer.shift()

    if (streamState.buffer.length === 0) {
        if (streamState.draining) {
            streamState.closedPromise._fulfill(undefined)
            streamState.readablePromise =
                Promise.rejected(new Error("stream has been completely read"))
            streamState.state = "finished"
        } else {
            streamState.state = "waiting"
            streamState.readablePromise = new Promise()
            callPull(streamState)
        }
    }

    return data
}
