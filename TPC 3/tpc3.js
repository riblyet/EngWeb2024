var http = require('http');
var url = require('url');
var fs = require('fs');
var axios = require('axios');

function geraFilmes(filmes){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Filmes</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Filmes</h2>
            </div>
            <br>
            <div class="w3-container">
                <table class="w3-table w3-striped">
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Cast</th>
                        <th>Year</th>
                    </tr>
    `
    filmes.forEach(filme => {
        pagHTML += `
        <tr>
            <td><a href="/filmes/${filme.id}">${filme.title}</a></td>
            <td>${filme.genres}</td>
            <td>${filme.cast}</td>
            <td>${filme.year}</td>
        </tr>
        `
    });
    pagHTML += `
                </table>
            </div>
            <footer class="w3-container w3-teal">
                <p>TPC3 de ENGWEB2024</p>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}

function geraFilme(Filme){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${Filme.title}</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>${Filme.title}</h2>
            </div>
            <br>
            <div class="w3-container">
                <pre>
                    <p>Titulo: ${Filme.title}</p>
                    <p>Cast: ${Filme.cast}</p>
                    <p>Genero: ${Filme.genres}</p>
                    <p>Ano: ${Filme.year}</p>
                </pre>
            </div>
            <footer class="w3-container w3-teal">
                <p>TPC3 de ENGWEB2024</p>
                <a href="/filmes">Voltar</a>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}


function geraActores(actores){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Actores</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Actores</h2>
            </div>
            <br>
            <div class="w3-container">
                <table class="w3-table w3-striped">
                    <tr>
                        <th>Nome</th>
                    </tr>
    `
    actores.forEach(actor => {
        pagHTML += `
        <br>
        <tr>
            <a href="/actors/${actor.id}">${actor.actor}</a>
        </tr>
        `
    });
    pagHTML += `
                </table>
            </div>
            <footer class="w3-container w3-teal">
                <p>TPC3 de ENGWEB2024</p>
            </footer>
        </body>
    </html>
    `
    return pagHTML

}

function geraActor(actor){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${actor.actor}</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>${actor.actor}</h2>
            </div>
            <br>
            <div class="w3-container">
                <pre>
                `
    actor.filmes.forEach(filme => {
        pagHTML += `
        <a href="/filmes/${filme.id}">${filme.titulo}</a>
        `         
    });

            pagHTML +=`
                </pre>
            </div>
            <footer class="w3-container w3-teal">
                <p>TPC3 de ENGWEB2024</p>
                <a href="/actores">Voltar</a>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}

function geraGenero(genre){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${genre.genero}</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>${genre.genero}</h2>
            </div>
            <br>
            <div class="w3-container">
                <pre>
                `
    genre.filmes.forEach(filme => {
        pagHTML += `
        <a href="/filmes/${filme.id}">${filme.titulo}</a>
        `         
    });

            pagHTML +=`
                </pre>
            </div>
            <footer class="w3-container w3-teal">
                <p>TPC3 de ENGWEB2024</p>
                <a href="/filmes">Voltar</a>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}

function geraGeneros(genres){
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Generos</title>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Generos</h2>
            </div>
            <br>
            <div class="w3-container">
                <table class="w3-table w3-striped">
                    <tr>
                        <th>Genero</th>
                    </tr>
    `
    genres.forEach(genre => {
        pagHTML += `
        <br>
        <tr>
            <a href="/generos/${genre.id}">${genre.genero}</a>
        </tr>
        `
    });
    pagHTML += `
                </table>
            </div>
            <footer class="w3-container w3-teal">
                <p>TPC3 de ENGWEB2024</p>
            </footer>
        </body>
    </html>
    `
    return pagHTML

}



// Criação do servidor com axios
http.createServer(function (req, res) {
    var regexF = /\/filmes\/[0-9a-f]+$/
    var regexA = /\actors\/[0-9]+$/
    var regexG = /\generos\/[0-9]+$/
    var q = url.parse(req.url, true)
    if (q.pathname == '/') {
        fs.readFile('index.html', function (erro, dados) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(dados);
            res.end();
        });
    }
    else if (q.pathname == '/filmes') {
        axios.get('http://localhost:3000/filmes')
            .then(response => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(geraFilmes(response.data));
                res.end();
            })
            .catch(function (erro) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<p>Erro: ' + erro + '</p>');
                res.end();
            });
    }
    else if (q.pathname == '/cast') {
        axios.get('http://localhost:3000/actors')
            .then(response => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(geraActores(response.data));
                res.end();
            })
            .catch(function (erro) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<p>Erro: ' + erro + '</p>');
                res.end();
            });
    }
    else if (q.pathname == '/genres') {
        axios.get('http://localhost:3000/generos')
            .then(response => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(geraGeneros(response.data));
                res.end();
            })
            .catch(function (erro) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<p>Erro: ' + erro + '</p>');
                res.end();
            });
    }
    else if (regexF.test(q.pathname)) {
        axios.get(`http://localhost:3000` + q.pathname)
            .then(response => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(geraFilme(response.data));
                res.end();
            })
            .catch(function (erro) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<p>Erro: ' + erro + '</p>');
                res.end();
            });
    }
    else if (regexA.test(q.pathname)) {
        axios.get(`http://localhost:3000` + q.pathname)
            .then(response => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(geraActor(response.data));
                res.end();
            })
            .catch(function (erro) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<p>Erro: ' + erro + '</p>');
                res.end();
            });
    }
    else if (regexG.test(q.pathname)) {
        axios.get(`http://localhost:3000` + q.pathname)
            .then(response => {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(geraGenero(response.data));
                res.end();
            })
            .catch(function (erro) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write('<p>Erro: ' + erro + '</p>');
                res.end();
            });
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<p>Pedido não suportado: ' + q.pathname + '</p>');
        res.end();
    }
}).listen(7775);
