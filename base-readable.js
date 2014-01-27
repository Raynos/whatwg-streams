var ReadableStreamState = require("./readable/stream-state.js")
var constructor = require("./readable/constructor.js")
var read = require("./readable/read.js")
var wait = require("./readable/wait.js")
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

proto.wait = function protoWait() {
    return wait(this._state)
}

defineProperty(proto, "state", {
    configurable: true,
    get: function getState() {
        return this._state.state
    }
})

proto.abort = function protoAbort(reason) {
    return abort(this._state, reason)
}

defineProperty(proto, "closed", {
    configurable: true,
    get: function getClosed() {
        return this._state.closedPromise
    }
})

// TODO IMPLEMENT
proto.pipe = function protoPipe() {}

module.exports = BaseReadableStream



