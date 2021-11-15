const fs = require("fs");
const http = require("http");
const { Stream } = require("stream");

const server = http.createServer();

server.on('request', (req, res) => {
    // fs.readFile('input.txt', (err, data) => {
    //     if (err) return console.log(err);
    //     res.end(data.toString());
    // });

    //2nd ways to stream
    // const rstream = fs.createReadStream("input.txt");

    // rstream.on('data', (chunkdata) => {
    //     res.write(chunkdata);
    // });
    // rstream.on('end', () => {
    //     res.end();
    // });
    // rstream.on('error', (err) => {
    //     res.end("404");
    // })

    // 3rd way to Stream
    const rstream = fs.createReadStream("input.txt");
    rstream.pipe(res);


})

server.listen(8000, "127.0.0.1", () => {
    console.log("server is ready")
});