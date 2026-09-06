var express = require('express');
var router = express.Router();
var md5 = require('md5');
var loginModel = require('../../models/admin/loginModel');

router.get('/login', function(req, res) {
  res.render('iniciar_sesion', { error: null });
});

router.post('/iniciar_sesion', function(req, res) {
  var usuario = req.body.username;
  var password = req.body.password;

  console.log('Intento de login');
  console.log('Usuario ingresado:', usuario);
  console.log('Password ingresada:', password);

  if (!usuario || !password) {
    console.log('Faltan datos');
    return res.status(400).render('iniciar_sesion', {
      error: 'Debes completar todos los campos.'
    });
  }

  var passwordHash = md5(password);
  console.log('Password en MD5:', passwordHash);

  loginModel.findUserByUsernameAndPassword(usuario, passwordHash)
    .then(function(rows) {
      console.log('Resultado de la consulta:', rows);

      if (rows.length > 0) {
        console.log('Login correcto para:', usuario);
        return res.redirect('/');
      }

      console.log('Login incorrecto para:', usuario);
      return res.status(401).render('iniciar_sesion', {
        error: 'Usuario o contraseña incorrectos.'
      });
    })
    .catch(function(error) {
      console.log('Error al buscar usuario:', error);
      return res.status(500).send('Hubo un error en el login');
    });
});

router.get('/register', function(req, res) {
  res.render('registrarse', { error: null, success: null });
});

router.post('/register', function(req, res) {
  var usuario = req.body.username;
  var password = req.body.password;

  console.log('Intento de registro');
  console.log('Usuario a registrar:', usuario);

  if (!usuario || !password) {
    console.log('Faltan datos para registrar');
    return res.status(400).render('registrarse', {
      error: 'Debes completar todos los campos.',
      success: null
    });
  }

  var passwordHash = md5(password);
  console.log('Password en MD5 para guardar:', passwordHash);

  loginModel.createUser(usuario, passwordHash)
    .then(function() {
      console.log('Usuario registrado correctamente:', usuario);
      return res.render('registrarse', {
        error: null,
        success: 'Usuario registrado correctamente.'
      });
    })
    .catch(function(error) {
      console.log('Error al registrar:', error);
      return res.status(500).send('Hubo un error al registrar');
    });
});

module.exports = router;