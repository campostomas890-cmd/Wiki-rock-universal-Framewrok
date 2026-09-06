var express = require('express');
var router = express.Router();
var md5 = require('md5');
var loginModel = require('../../models/admin/loginModel');

router.get('/login', function(req, res, next) {
  res.render('iniciar_sesion', { error: null });
});

router.post('/login', async function(req, res, next) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();

  console.log('Intento de login:', {
    usuario: username,
    fecha: new Date().toLocaleString()
  });
  console.log('Datos enviados desde formulario:', req.body);

  if (!username || !password) {
    console.log('Login rechazado por datos vacíos');
    return res.status(400).render('iniciar_sesion', {
      error: 'Debes completar usuario y contraseña.'
    });
  }

  var passwordHash = md5(password);
  console.log('Password enviada:', password);
  console.log('Password en MD5:', passwordHash);

  try {
    var rows = await loginModel.findUserByUsernameAndPassword(username, passwordHash);
    console.log('Usuario encontrado en BD:', rows);

    if (rows && rows.length > 0) {
      console.log('Usuario autenticado correctamente:', {
        id: rows[0].id,
        usuario: rows[0].usuario,
        passwordHash: rows[0].contraseña
      });
      return res.redirect('/');
    }

    console.log('Login fallido para usuario:', username);
    return res.status(401).render('iniciar_sesion', {
      error: 'Usuario o contraseña incorrectos.'
    });
  } catch (error) {
    console.error('Error en login:', error);
    return next(error);
  }
});

router.get('/register', function(req, res, next) {
  res.render('registrarse', { error: null, success: null });
});

router.post('/register', async function(req, res, next) {
  var username = (req.body.username || '').trim();
  var password = (req.body.password || '').trim();

  console.log('Intento de registro:', {
    usuario: username,
    fecha: new Date().toLocaleString()
  });

  if (!username || !password) {
    console.log('Registro rechazado por datos vacíos');
    return res.status(400).render('registrarse', {
      error: 'Debes completar formulario.',
      success: null
    });
  }

  var passwordHash = md5(password);
  console.log('Password guardada en MD5:', passwordHash);

  try {
    await loginModel.createUser(username, passwordHash);
    console.log('Usuario registrado correctamente:', username);
    return res.render('registrarse', {
      error: null,
      success: 'Usuario registrado correctamente.'
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return next(error);
  }
});

module.exports = router;