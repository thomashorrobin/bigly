const http = require('http');
var fs = require('fs');
var path = require('path');
const hostname = '127.0.0.1';

function startClientServer(options) {
    let server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        if (req.url == '/') {
            getFile('/index.html', res);
        } else {
            getFile(req.url, res);
        }
    });
    server.listen(options.port, hostname, () => {
        console.log(`Client running at http://${hostname}:${options.port}/`);
    });
}

function getFile(fileName, response) {
    let filePath = './public' + fileName;
    let contentType = getContentType(fileName);
    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            response.end(); 
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content);
        }
    });
}

function getContentType(fileName) {
    var extname = path.extname(fileName);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    return contentType;
}

module.exports = startClientServer;