var ReadableStreamState = require("./readable/stream-state.js")
var constructor = require("./readable/constructor.js")
var read = require("./readable/read.js")
var waitForReadable = require("./readable/wait-for-readable.js")
var abort = require("./readable/abort.js")

var defineProperty = Object.defineProperty

function BaseReadableStream(options) {
    if (!(this instanceof BaseReadableStream)) {
        return new BaseReadableStream(options)
    }

    this._state = new ReadableStreamState(options)

    constructor(this._state, options.start)
}

var proto = BaseReadableStream.prototype

proto.read = function protoRead() {
    return read(this._state)
}

proto.waitForReadable = function protoWaitForReadable() {
    return waitForReadable(this._state)
}

defineProperty(proto, "readableState", {
    configurable: true,
    get: function getReadableState() {
        return this._state.readableState
    }
})

proto.abort = function protoAbort(reason) {
    return abort(this._state, reason)
}

defineProperty(proto, "finished", {
    configurable: true,
    get: function getFinished() {
        return this._state.finished
    }
})

// TODO IMPLEMENT
proto.pipe = function protoPipe() {}

module.exports = BaseReadableStream



