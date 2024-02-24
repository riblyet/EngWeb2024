var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    // c1 - c100
    var regex = /\/c[1-9][0-9]{0,2}$/;                               
    var q = url.parse(req.url, true);
    if (regex.test(q.pathname)) {
        var filePath = 'html/c' + q.pathname.substring(2) + '.html';
        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write('<h1>404 Not Found</h1>');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(data);
                res.write('<pre>' + q.pathname + '</pre>');
                res.end();
            }
        });
    }
}).listen(7777);
