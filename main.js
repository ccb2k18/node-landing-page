const http = require("http");
const fs = require("fs");


const serveFile = (pathToFile, res, type="html") => {
    fs.readFile(`${__dirname}/${pathToFile}`, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write(`An internal server error occurred.`);
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": `text/${type}` });
            res.write(data);
            res.end();
        }
    });
};

const serve404NotFound = (res) => {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.readFile(`${__dirname}/public/html/404notfound.html`, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/html" });
            res.write("An internal server error occurred.");
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
};


http.createServer(function (req, res) {

    if (req.url === "/") {
        serveFile("public/html/index.html", res);
    } else if (req.url === "/jessup") {
        serveFile("public/html/jessup.html", res);
    } else if (req.url === "/william/new") {
        serveFile("public/html/william.html", res);
    } else if (req.url === "/public/css/styles.css") {
        serveFile("public/css/styles.css", res, "css");
    } else {
        serve404NotFound(res);
    }
}).listen(6789);