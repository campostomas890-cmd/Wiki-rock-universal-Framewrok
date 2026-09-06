const pool = require('../bd');

async function findUserByUsernameAndPassword(username, passwordHash) {
  const sql = 'SELECT * FROM `usuarioycontraseñaprogramadores` WHERE `usuario` = ? AND `contraseña` = ? LIMIT 1';
  const rows = await pool.query(sql, [username, passwordHash]);
  return rows;
}

async function createUser(username, passwordHash) {
  const sql = 'INSERT INTO `usuarioycontraseñaprogramadores` (`usuario`, `contraseña`) VALUES (?, ?)';
  return pool.query(sql, [username, passwordHash]);
}

module.exports = {
  findUserByUsernameAndPassword,
  createUser
};
