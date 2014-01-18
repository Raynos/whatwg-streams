var Promise = require("./lib/promise");

var defineProperty = Object.defineProperty

var proto = BaseReadableStream.prototype
proto.read = read
proto.waitForReadable = waitForReadable
defineProperty(proto, "readableState", {
    configurable: true,
    get: getReadableState
})
proto.pipe = pipe
proto.abort = abort
defineProperty(proto, "finished", {
    configurable: true,
    get: getFinished
})
proto._push = _push
proto._finish = _finish
proto._error = _error
proto._callPull = _callPull

module.exports = BaseReadableStream

function BaseReadableStream(options) {
    this._state = {
        buffer: [],
        started: false,
        draining: false,
        pulling: false,
        readableState: "waiting",
        storedError: null,
        readablePromise: new Promise(),
        finishedPromise: new Promise(),
        startedPromise: new Promise(),
        onAbort: options.abort,
        onPull: options.pull
    }
}

function read() {}
function waitForReadable() {}
function getReadableState() {}

function pipe() {}

function abort() {}

function getFinished() {}

function _push() {}
function _finish() {}
function _error() {}
function _callPull() {}
