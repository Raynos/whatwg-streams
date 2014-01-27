module.exports = push

function push(streamState, data) {
    // NON STANDARD
    if (streamState.state === "finished") {
        throw new Error("cannot push into finished stream")
    // NON STANDARD
    } else if (streamState.state === "errored") {
        throw new Error("cannot push into errored stream")
    }

    streamState.buffer.push(data)
    streamState.pulling = false

    if (streamState.state === "waiting") {
        streamState.readablePromise._fulfill(undefined)
        streamState.state = "readable"
    }

    // NON STANDARD
    var needsMore = false
    return needsMore
}
