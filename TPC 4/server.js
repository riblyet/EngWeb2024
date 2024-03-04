
var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');
const { exec } = require('child_process');

var templates = require('./templates.js')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var server = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET":
                // GET / --------------------------------------------------------------------
                if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.mainPage(d))
                }
                // GET /compositores --------------------------------------------------------------------
                else if(req.url == "/compositores"){
                    axios.get('http://localhost:3000/compositores')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorListPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                    } 
                // GET /compositores/:id --------------------------------------------------------------------
                else if(/\/compositores\/C[0-9]+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                    }
                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.compositorFormPage(d))
                }
                // GET /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idCompositor = partes[partes.length - 1]
                    axios.get('http://localhost:3000/compositores/' + idCompositor)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorFormEditPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if(/\/compositores\/delete\/C[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idCompositor = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/compositores/' + idCompositor)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.compositorPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /periodos --------------------------------------------------------------------
                else if(req.url == "/periodos"){
                    axios.get('http://localhost:3000/periodos')
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoListPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                    }
                // GET /periodos/:id --------------------------------------------------------------------
                else if(/\/periodos\/P[0-9]+/.test(req.url)){
                    axios.get('http://localhost:3000' + req.url)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                    }
                // GET /periodos/registo --------------------------------------------------------------------
                else if (req.url == "/periodos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(templates.periodoFormPage(d))
                }
                // GET /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/P[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idPeriodo = partes[partes.length - 1]
                    axios.get('http://localhost:3000/periodos/' + idPeriodo)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoFormEditPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET /periodos/delete/:id --------------------------------------------------------------------
                else if(/\/periodos\/delete\/P[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idPeriodo = partes[partes.length - 1]
                    axios.delete('http://localhost:3000/periodos/' + idPeriodo)
                        .then(resposta => {
                            res.writeHead(200, {'Content-Type': 'text/html'})
                            res.end(templates.periodoPage(resposta.data, d))
                        })
                        .catch(erro =>{
                            res.writeHead(520, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(erro, d))
                        })
                }
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(`Pedido GET não suportado : ${req.url}`, d))
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                if (req.url == "/compositores/registo"){
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.post('http://localhost:3000/compositores', result)
                                .then(resposta => {
                                    //execute file script.py
                                    exec('python3 script.py', (error, stdout, stderr) => {
                                        if (error) {
                                            console.error(`exec error: ${error}`);
                                            return;
                                        }
                                    });
                                    res.writeHead(201, {'Content-Type': 'text/html'})
                                    res.end(templates.compositorPage(resposta.data, d))
                                })
                                .catch(erro =>{
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(`Unable to collect data from body`, d))
                        }
                    })
                }
                    


                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if(/\/compositores\/edit\/C[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idCompositor = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.put('http://localhost:3000/compositores/' + idCompositor, result)
                                .then(resposta => {
                                    res.writeHead(201, {'Content-Type': 'text/html'})
                                    res.end(templates.compositorPage(resposta.data, d))
                                })
                                .catch(erro =>{
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(`Unable to collect data from body`, d))
                        }
                    })
                }
                // POST /periodos/registo --------------------------------------------------------------------
                else if (req.url == "/periodos/registo"){
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.post('http://localhost:3000/periodos', result)
                                .then(resposta => {
                                    exec('python3 script.py', (error, stdout, stderr) => {
                                        if (error) {
                                            console.error(`exec error: ${error}`);
                                            return;
                                        }
                                    });
                                    res.writeHead(201, {'Content-Type': 'text/html'})
                                    res.end(templates.periodoPage(resposta.data, d))
                                })
                                .catch(erro =>{
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(`Unable to collect data from body`, d))
                        }
                    })
                }
                // POST /periodos/edit/:id --------------------------------------------------------------------
                else if(/\/periodos\/edit\/P[0-9]+/.test(req.url)){
                    var partes = req.url.split('/')
                    var idPeriodo = partes[partes.length - 1]
                    collectRequestBodyData(req, result => {
                        if(result) {
                            axios.put('http://localhost:3000/periodos/' + idPeriodo, result)
                                .then(resposta => {
                                    res.writeHead(201, {'Content-Type': 'text/html'})
                                    res.end(templates.periodoPage(resposta.data, d))
                                })
                                .catch(erro =>{
                                    res.writeHead(521, {'Content-Type': 'text/html'})
                                    res.end(templates.errorPage(erro, d))
                                })
                        }
                        else {
                            res.writeHead(201, {'Content-Type': 'text/html'})
                            res.end(templates.errorPage(`Unable to collect data from body`, d))
                        }
                    })
                }

                // POST ? -> Lancar um erro
                else{
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.end(templates.errorPage(`Pedido POST não suportado : ${req.url}`, d))
                }
                break
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



