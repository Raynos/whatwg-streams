var BaseReadable = require("../../base-readable.js")

module.exports = arrayReadable

function arrayReadable(array) {
    array = array.slice()

    var stream = BaseReadable({
        start: function (push, finish) {
            array.forEach(function (value) {
                push(value)
            })

            finish()
        },
        pull: function () {},
        abort: function () {
            throw new Error("abort not implemented for arrayReadable")
        }
    })

    return stream
}
