exports.compositorListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositor Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Compositors List
                    <a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a>
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Nome</th><th>Data de Nascimento</th><th>Data de Óbito</th><th>Periodo</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        if (/C[0-9]+/.test(slist[i].id)){
            pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/compositores/${slist[i].id}">
                            ${slist[i].nome}
                        </a>
                    </td>
                    <td>${slist[i].dataNasc}</td>
                    <td>${slist[i].dataObito}</td>
                    <td>${slist[i].periodo}</td>

                    <td>
                        [<a href="/compositores/edit/${slist[i].id}">Edit</a>][<a href="/compositores/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
        }
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated by ENGWEB2024 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.compositorFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositor Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Compositor Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc"/>
                        <label>Data Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                    </fieldset>

                    <br/>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024 in ${d} - [<a href="/compositores">Voltar</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.compositorFormEditPage = function(a, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositor Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Compositor Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Bio</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${a.bio}"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${a.dataNasc}"/>
                        <label>Data Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${a.dataObito}"/>
                        <label>Periodo</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${a.periodo}"/>
                    </fieldset>
                      
                    <br>
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024 in ${d} - [<a href="/compositores">Voltar</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

// ---------------Compositor's Page--------------------------------
// Change and adapt to current dataset...
exports.compositorPage = function( compositor, d ){
    var pagHTML = `
    <html>
    <head>
        <title>Compositor: ${compositor.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Compositor ${compositor.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${compositor.nome}</li>
                    <li><b>Número: </b> ${compositor.id}</li>
                    <li><b>Bio: </b> ${compositor.bio}</li>
                    <li><b>Data Nascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>Data Obito: </b> ${compositor.dataObito}</li>
                    <li><b>Periodo: </b> ${compositor.periodo}</li>
                </ul>
            </div>
            
            <footer class="w3-container w3-teal">
                <address>Generated by ENGWEB2024 in ${d} - [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}

// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <html>
    <head>
        <title>Error Page</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Error Page</h1>
            </header>

            <div class="w3-container">
                <p>${d}: Error: ${errorMessage}</p>
            </div>

            <footer class = "w3-container w3-teal">
                <address>Generated by ENGWEB2024 in ${d} - [<a href="/compositores">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}