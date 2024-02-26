const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const q = url.parse(req.url, true).pathname.slice(1) // Tirar a barra '/'
    if (q === '') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('404 File Not Found');
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(data);
                res.end();
            }
        })
    } else {
        fs.readFile('mapa-virtual.json', (err, jsonData) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('500 Internal Server Error');
                res.end();
            } else {
                const ids = JSON.parse(jsonData).cidades.map(cidade => cidade.id)
                if (ids.includes(q)) {
                    fs.readFile(`html/${q}.html`, (err, data) => {
                        if (err) {
                            res.writeHead(404, {'Content-Type': 'text/plain'});
                            res.write('404 File Not Found');
                            res.end();
                        } else {
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(data);
                            res.end();
                        }
                    });
                } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write('404 Id Not Found');
                res.end();
                }
            }
        });
    }
}).listen(7775);

