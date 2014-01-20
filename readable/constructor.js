var Promise = require("bluebird")

var error = require("./error.js")
var push = require("./push.js")
var finish = require("./finish.js")

module.exports = constructor

function constructor(streamState, start) {
    var value = start(
        push.bind(null, streamState),
        finish.bind(null, streamState),
        error.bind(null, streamState)
    )

    var startedPromise = streamState.startedPromise = Promise.cast(value)
    startedPromise.then(onFulfill, onReject)

    function onFulfill() {
        streamState.started = true
    }

    function onReject(reason) {
        error(streamState, reason)
    }
}
