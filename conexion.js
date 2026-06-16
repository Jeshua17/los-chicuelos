const mysql = require('mysql2/promise'); // Conector en versión de Promesas

const pool = mysql.createPool({
  host: 'localhost',              
  user: 'root',                   
  password: '123qwe', // La contraseña de tu MySQL Workbench
  database: 'theboys',       // Tu base de datos de Workbench
  port: 3306,                     
  waitForConnections: true,
  connectionLimit: 5              
});

module.exports = pool;