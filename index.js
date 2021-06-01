const http = require("http");
const fs = require("fs");

let count = 0;

const server = http.createServer((req, res) => {
    let path = "";
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");

    switch (req.url) {
        case "/":
            path = "home.html";
            count += 1;
            break;
        case "/contact":
            path = "contact.html";
            count += 1;
            break;
        case "/product":
            path = "product.html";
            count += 1;
            break;
        default:
            path = "error.html";
            res.statusCode = 404;
            break;
    }

    fs.readFile(`./views/${path}`, (err, data) => {
        if (err) {
            console.error(err);
            res.write("Server Error");
            res.end();
        } else {
            data = data.toString().replace('{{count}}', count.toString());
            res.write(data, "utf-8");
            res.end();
        }
    });
});

server.listen(8008, "localhost", () => {
    console.log("Server is listening on 8008");
});
