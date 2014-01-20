module.exports = push

function push(streamState, data) {
    // NON STANDARD
    if (streamState.readableState === "finished") {
        throw new Error("cannot push into finished stream")
    // NON STANDARD
    } else if (streamState.readableState === "errored") {
        throw new Error("cannot push into errored stream")
    }

    streamState.buffer.push(data)
    streamState.pulling = false

    if (streamState.readableState === "waiting") {
        streamState.readablePromise._fulfill(undefined)
        streamState.readableState = "readable"
    }

    // NON STANDARD
    var needsMore = false
    return needsMore
}
