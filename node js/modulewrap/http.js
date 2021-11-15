const fs = require("fs");
const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.end('hello from the home page site  nice site');
    } else if (req.url == "/about") {
        res.end("its is belong to about page");
    } else if (req.url == "/server") {
        res.end("this is server site page");
    } else if (req.url == "/api") {
        fs.readFile(`${__dirname}/api.js`, "utf-8", (err, data) => {
            console.log(data);
            // res.end(data);
            const objdata = JSON.parse(data);
            res.end(objdata[0].name);
        })
    } else {
        res.writeHead(404);
        res.end("sorry page is error");
    }
});

server.listen(3000, "127.0.0.1", () => {
    console.log("server is ready");
});