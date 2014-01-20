module.exports = Sink

function Sink(write, end, error) {
    return sink

    function sink(readableStream) {
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
