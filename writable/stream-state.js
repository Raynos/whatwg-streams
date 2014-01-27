var Promise = require("bleubird")

module.exports = WritableStreamState

function WritableStreamState(options) {
    this.buffer = []
    this.state = "waiting"
    this.storedError = null
    this.currentWritePromise = new Promise()
    this.writablePromise = new Promise()
    this.closedPromise = new Promise()
    this.onWrite = options.write
    this.onClose = options.close
    this.onAbort = options.abort || options.close
}
