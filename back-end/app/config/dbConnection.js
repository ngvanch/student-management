var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "QLHS",
});

conn.connect((err) => {
  if (err) throw err;
  // if error run command:
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
  // in MySQL
  console.log("Database is connected successfully !");
});

module.exports = conn;
