var WritableStreamState = require("./writable/stream-state.js")
var constructor = require("./writable/constructor.js")
var write = require("./writable/write.js")
var waitForWritable = require("./writable/wait-for-writable.js")
var close = require("./writable/close.js")
var dispose = require("./writable/dispose.js")

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

proto.waitForWritable = function protoWaitForWritable() {
    return waitForWritable(this._state)
}

defineProperty(proto, "writableState", {
    configurable: true,
    get: function getWritableState() {
        return this._state.writableState
    }
})

proto.close = function protoClose() {
    return close(this._state)
}

proto.dispose = function protoDispose(reason) {
    return dispose(this._state, reason)
}

defineProperty(proto, "closed", {
    configurable: true,
    get: function getClose() {
        return this._state.closedPromise
    }
})

module.exports = BaseWritableStream
