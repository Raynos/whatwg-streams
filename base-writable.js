var WritableStreamState = require("./writable/stream-state.js")
var constructor = require("./writable/constructor.js")
var write = require("./writable/write.js")
var wait = require("./writable/wait.js")
var close = require("./writable/close.js")
var abort = require("./writable/abort.js")

var defineProperty = Object.defineProperty

function BaseWritableStream(options) {
    if (!(this instanceof BaseWritableStream)) {
        return new BaseWritableStream(options)
    }

    this._state =  new WritableStreamState(options)

    constructor(this._state, options.start)
}

var proto = BaseWritableStream.prototype

proto.write = function protoWrite(chunk) {
    return write(this._state, chunk)
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

proto.close = function protoClose() {
    return close(this._state)
}

proto.abort = function protoAbort(reason) {
    return abort(this._state, reason)
}

defineProperty(proto, "closed", {
    configurable: true,
    get: function getClose() {
        return this._state.closedPromise
    }
})

module.exports = BaseWritableStream
