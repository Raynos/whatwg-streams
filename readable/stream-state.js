var Promise = require("bluebird")

module.exports = ReadableStreamState

function ReadableStreamState(options) {
    this.buffer = []
    this.started = false
    this.draining = false
    this.pulling = false
    this.readableState = "waiting"
    this.storedError = null
    this.readablePromise = new Promise()
    this.finishedPromise = new Promise()
    this.startedPromise = new Promise()
    this.onAbort = options.abort
    this.onPull = options.pull
}
