const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  res.render('index', { title: 'Compositores Musicais', data: d });
});

// COMPOSITORES

router.get('/compositores', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/compositores')
  .then(resposta => {
    res.render('listaCompositores', { lista: resposta.data, data: d, title: 'Lista de Compositores' });
  })
  .catch(erro => {
    res.render('error', {error: erro})
  })
});

router.get('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoCompositor', { title: 'Registo de compositor', data: d});
});

router.get('/compositores/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
  .then(resposta => {
    res.render('compositor', { compositor: resposta.data, data: d, title: resposta.data.nome});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro a aceder o compositor' });
  })
});

router.get('/compositores/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/compositores/' + req.params.id)
  .then(resposta => {
    res.render('confirmarDelete', { compositor: resposta.data, title: 'Compositor eliminado com sucesso', data: d});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro a eliminar o compositor' });
  })
});
  
router.post('/compositores/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  var novoCompositor = req.body;

  // Verificar se o período do compositor já existe
  axios.get('http://localhost:3000/periodos')
    .then(resposta => {
      var periodosExistentes = resposta.data;
      var periodoExistente = periodosExistentes.find(periodo => periodo.nome === novoCompositor.periodo);

      if (!periodoExistente) {
        // Se o período não existe, criar e adicionar
        axios.post('http://localhost:3000/periodos', { nome: novoCompositor.periodo })
          .then(resposta => {
            console.log("Novo período adicionado:", resposta.data);
            // Continuar com o registro do compositor
            axios.post('http://localhost:3000/compositores', novoCompositor)
              .then(resposta => {
                res.render('confirmarRegisto', { compositor: novoCompositor, title: 'Registo de um compositor com sucesso', data: d });
              })
              .catch(erro => {
                res.render('error', { error: erro, message: 'Erro ao registar um compositor novo' });
              });
          })
          .catch(erro => {
            res.render('error', { error: erro, message: 'Erro a adicionar um novo período' });
          });
      } else {
        // Se o período existe, podemos prosseguir com o registro do compositor
        axios.post('http://localhost:3000/compositores', novoCompositor)
          .then(resposta => {
            res.render('confirmarRegisto', { compositor: novoCompositor, title: 'Registo de um compositor com sucesso', data: d });
          })
          .catch(erro => {
            res.render('error', { error: erro, message: 'Erro ao registar um compositor novo' });
          });
      }
    })
    .catch(erro => {
      res.render('error', { error: erro, message: 'Erro ao verificar períodos existentes' });
    });
});


router.get('/compositores/editar/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/compositores/' + req.params.id)
  .then(resposta => {
    res.render('editarCompositor', { compositor: resposta.data, data: d, title: 'Editar ' + resposta.data.nome});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro a editar o compositor' });
  })
});

router.post('/compositores/editar/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.put('http://localhost:3000/compositores/' + req.params.id, req.body)
  .then(resposta => {
    res.render('compositor', { compositor: req.body, title: 'Compositor editado com sucesso', data: d});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro ao editar o compositor' });
  })
});

// PERIODOS

router.get('/periodos', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/periodos')
  .then(resposta => {
    res.render('listaPeriodos', { lista: resposta.data, data: d, title: 'Lista de Periodos' });
  })
  .catch(erro => {
    res.render('error', {error: erro})
  })
});

router.get('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  res.render('registoPeriodo', { title: 'Registo de periodo', data: d});
});

router.get('/periodos/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
  .then(resposta => {
    res.render('periodo', { periodo: resposta.data, data: d, title: resposta.data.nome});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro a aceder o periodo' });
  })
});

router.get('/periodos/delete/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.delete('http://localhost:3000/periodos/' + req.params.id)
  .then(resposta => {
    res.render('confirmarDeletePeriodo', { periodo: resposta.data, title: 'Periodo eliminado com sucesso', data: d});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro a eliminar o periodo' });
  })
});
  
router.post('/periodos/registo', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.post('http://localhost:3000/periodos', req.body)
  .then(resposta => {
    res.render('confirmarRegistoPeriodo', { periodo: req.body, title: 'Registo de um periodo com sucesso', data: d});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro ao registar um periodo novo' });
  })
});

router.get('/periodos/editar/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/periodos/' + req.params.id)
  .then(resposta => {
    res.render('editarPeriodo', { periodo: resposta.data, data: d, title: 'Editar ' + resposta.data.nome});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro a editar o periodo' });
  })
});

router.post('/periodos/editar/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16)
  axios.put('http://localhost:3000/periodos/' + req.params.id, req.body)
  .then(resposta => {
    res.render('compositor', { periodo: req.body, title: 'Periodo editado com sucesso', data: d});
  })
  .catch(erro => {
    res.render('error', { error: erro, message : 'Erro ao editar o periodo' });
  })
});

module.exports = router;
