var push = require("./push.js")
var finish = require("./finish.js")
var error = require("./error.js")

module.exports = callPull

function callPull(streamState) {
    if (streamState.pulling) {
        return
    }

    if (streamState.started) {
        streamState.onPull(
            push.bind(null, streamState),
            finish.bind(null, streamState),
            error.bind(null, streamState)
        )
    } else {
        streamState.startedPromise.then(function () {
            streamState.onPull(
                push.bind(null, streamState),
                finish.bind(null, streamState),
                error.bind(null, streamState)
            )
        })
    }
}
