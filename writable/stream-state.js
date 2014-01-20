var Promise = require("bleubird")

module.exports = WritableStreamState

function WritableStreamState(options) {
    this.buffer = []
    this.writableState = "waiting"
    this.storedError = null
    this.currentWritePromise = new Promise()
    this.writablePromise = new Promise()
    this.closedPromise = new Promise()
    this.onWrite = options.write
    this.onClose = options.close
    this.onDispose = options.dispose || options.close
}
