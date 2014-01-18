var test = require("tape")

var whatwgStreams = require("../index")

test("whatwgStreams is a function", function (assert) {
    assert.equal(typeof whatwgStreams, "function")
    assert.end()
})
