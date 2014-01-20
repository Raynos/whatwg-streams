module.exports = finish

function finish(streamState) {
    // NON STANDARD
    if (streamState.readableState === "finished") {
        throw new Error("cannot finish finished stream")
    // NON STANDARD
    } else if (streamState.readableState === "errored") {
        throw new Error("cannot finish errored stream")
    }

    if (streamState.readableState === "waiting") {
        streamState.readablePromise._reject(
            new Error("stream has been completely read"))
        streamState.finishedPromise._fulfill(undefined)
        streamState.readableState = "finished"
    } else if (streamState.readableState === "readable") {
        streamState.draining = true
    }
}
