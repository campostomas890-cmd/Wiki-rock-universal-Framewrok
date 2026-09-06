var express = require('express');
var router = express.Router();
var md5 = require('md5');
var pool = require('../models/bd');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wiki Rock Universal' });
});

router.get('/index.html', function(req, res, next) {
  res.redirect('/');
});

router.get('/Breaking_Benjamin', function(req, res, next) {
  res.render('Breaking_Benjamin');
});

router.get('/Breaking_Benjamin.hbs', function(req, res, next) {
  res.redirect('/Breaking_Benjamin');
});

router.get('/slipknot', function(req, res, next) {
  res.render('slipknot');
});

router.get('/slipknot.hbs', function(req, res, next) {
  res.redirect('/slipknot');
});

router.get('/deftones', function(req, res, next) {
  res.render('deftones');
});

router.get('/deftones.hbs', function(req, res, next) {
  res.redirect('/deftones');
});

router.get('/chevelle', function(req, res, next) {
  res.render('chevelle');
});

router.get('/linkin_park', function(req, res, next) {
  res.render('linkin_park');
});

router.get('/three_days_grace', function(req, res, next) {
  res.render('three_days_grace');
});

router.get('/iniciar_sesion', function(req, res, next) {
  res.render('iniciar_sesion', { error: null });
});

router.post('/iniciar_sesion', function(req, res, next) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();

  if (!username || !password) {
    return res.status(400).render('iniciar_sesion', {
      error: 'Debes completar usuario y contraseña.'
    });
  }

  var passwordHash = md5(password);
  var query = 'SELECT * FROM `usuarioycontraseñaprogramadores` WHERE `usuario` = ? AND `contraseña` = ? LIMIT 1';

  pool.query(query, [username, passwordHash])
    .then(function(rows) {
      if (rows && rows.length > 0) {
        return res.redirect('/');
      }

      return res.status(401).render('iniciar_sesion', {
        error: 'Usuario o contraseña incorrectos.'
      });
    })
    .catch(function(err) {
      next(err);
    });
});

router.get('/iniciar_sesion.hbs', function(req, res, next) {
  res.redirect('/iniciar_sesion');
});

router.get('/registrarse', function(req, res, next) {
  res.render('registrarse', { error: null, success: null });
});

router.post('/registrarse', function(req, res, next) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();

  if (!username || !password) {
    return res.status(400).render('registrarse', {
      error: 'Debes completar todos los campos.',
      success: null
    });
  }

  var passwordHash = md5(password);
  var query = 'INSERT INTO `usuarioycontraseñaprogramadores` (`usuario`, `contraseña`) VALUES (?, ?)';

  pool.query(query, [username, passwordHash])
    .then(function() {
      res.render('registrarse', {
        error: null,
        success: 'Usuario registrado correctamente.'
      });
    })
    .catch(function(err) {
      next(err);
    });
});

router.get('/registrarse.hbs', function(req, res, next) {
  res.redirect('/registrarse');
});

module.exports = router;
