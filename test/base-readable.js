var test = require("tape")

var BaseReadable = require("../base-readable.js")

function arrayReadable(array) {
    array = array.slice()

    var stream = BaseReadable({
        start: function () {},
        pull: function (push, finish) {
            if (array.length === 0) {
                return finish()
            }

            push(array.shift())
        },
        abort: function () {
            throw new Error("abort not implemented for arrayReadable")
        }
    })

    return stream
}

function Sink(write, end, error) {
    return sink

    function sink(readableStream) {
        console.log('state', readableStream.readableState)
        while (readableStream.readableState === "readable") {
            write(readableStream.read())
        }

        if (readableStream.readableState === "finished") {
            end()
        } else {
            readableStream.waitForReadable().then(
                sink.bind(null, readableStream),
                error || function (err) { throw err }
            )
        }
    }
}

test("BaseReadable is a function", function (assert) {
    assert.equal(typeof BaseReadable, "function")

    assert.end()
})

test("pump data from source to sink", function (assert) {
    var data = [1, 2, 3, 4]
    var buf = []

    var stream = arrayReadable(data)
    var sink = Sink(function write(chunk) {
        console.log('chunk', chunk)
        buf.push(chunk)
    }, function end() {
        console.log('buf', buf)
        assert.deepEqual(data, buf)

        assert.end()
    })

    sink(stream)

})
