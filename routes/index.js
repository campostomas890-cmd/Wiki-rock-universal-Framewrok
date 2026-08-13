var express = require('express');
var router = express.Router();

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
  res.render('iniciar_sesion');
});

router.get('/iniciar_sesion.hbs', function(req, res, next) {
  res.redirect('/iniciar_sesion');
});

router.get('/registrarse', function(req, res, next) {
  res.render('registrarse');
});

router.get('/registrarse.hbs', function(req, res, next) {
  res.redirect('/registrarse');
});

module.exports = router;
