var BaseReadable = require("../../base-readable.js")

module.exports = arrayReadable

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
