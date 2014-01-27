module.exports = finish

function finish(streamState) {
    // NON STANDARD
    if (streamState.state === "finished") {
        throw new Error("cannot finish finished stream")
    // NON STANDARD
    } else if (streamState.state === "errored") {
        throw new Error("cannot finish errored stream")
    }

    if (streamState.state === "waiting") {
        streamState.readablePromise._reject(
            new Error("stream has been completely read"))
        streamState.closedPromise._fulfill(undefined)
        streamState.state = "finished"
    } else if (streamState.state === "readable") {
        streamState.draining = true
    }
}
