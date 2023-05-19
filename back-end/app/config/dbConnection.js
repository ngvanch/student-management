var mysql = require("mysql");
var conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conn.connect((err) => {
  if (err) throw err;
  // if error.code = 'ER_NOT_SUPPORTED_AUTH_MODE', run command:
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
  // in MySQL
  console.log("Database is connected successfully!");
});

module.exports = conn;
