const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer(function(req, res) {
    const q = url.parse(req.url, true);
    let filename = '.' + q.pathname;

    if (q.pathname === '/') {
        filename = './index.html';
    } else {
        if (path.extname(filename) === '') {
            filename += '.html';
        }
    }

    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);
