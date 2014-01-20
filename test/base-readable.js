var test = require("tape")

var SimplePullStream = require("./lib/array-readable-pull.js")
var Sink = require("./lib/sink.js")
var BaseReadable = require("../base-readable.js")

test("BaseReadable is a function", function (assert) {
    assert.equal(typeof BaseReadable, "function")

    assert.end()
})

test("test a simple pull stream", function (assert) {
    var data = [1, 2, 3, 4]
    var buf = []

    var stream = SimplePullStream(data)
    var sink = Sink(function write(chunk) {
        buf.push(chunk)
    }, function end() {
        assert.deepEqual(data, buf)

        assert.end()
    })

    sink(stream)

})
