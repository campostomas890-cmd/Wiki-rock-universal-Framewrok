var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/admin/login');

var app = express();

// configuracion del motor de vistas (handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
// cambio a extended: true para procesar mejor el formulario html
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// este sector se definen rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// manejo de error general
app.use(function(req, res, next) {
  next(createError(404));
});

// manejo de errores generales
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;