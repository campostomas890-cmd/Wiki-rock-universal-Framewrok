var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var pool = require('../models/bd'); // Conexión a tu MySQL

/* POST para registrar un usuario: /users/register */
router.post('/register', async (req, res) => {
  // 1. Capturamos los datos que el usuario escribe en los inputs del formulario web
  // IMPORTANTE: Los nombres de la izquierda deben coincidir con el atributo name="" de tus inputs HTML
  const { txt_usuario, txt_password, txt_correo, txt_nombre, txt_apellido } = req.body;

  // Validación rápida para que no manden campos vacíos
  if (!txt_usuario || !txt_password || !txt_correo || !txt_nombre || !txt_apellido) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  try {
    // 2. Encriptamos la contraseña de manera segura antes de guardarla
    const passwordEncriptada = await bcrypt.hash(txt_password, 10);

    // 3. Consulta SQL con los nombres EXACTOS de tus columnas en DBeaver
    // IMPORTANTE: Asegurate de si tu columna se llama "correo_electronico" con guion bajo, o buscala bien en DBeaver.
    const query = 'INSERT INTO usuarios (usuario, password, correo_electronico, nombre, apellido) VALUES (?, ?, ?, ?, ?)';
    
    // 4. Pasamos las variables en el mismo orden que las columnas de arriba
    pool.query(query, [txt_usuario, passwordEncriptada, txt_correo, txt_nombre, txt_apellido], function(error, resultados) {
      if (error) {
        console.error('Error al insertar en DBeaver:', error);
        return res.status(500).send('Error interno al registrar el usuario.');
      }
      
      // Si sale todo bien, lo redireccionás a donde quieras (ej: al login de admin)
      res.redirect('/admin/login'); 
    });

  } catch (e) {
    console.error(e);
    res.status(500).send('Error en el servidor.');
  }
});

module.exports = router;