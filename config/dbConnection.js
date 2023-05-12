var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "ProjectDB",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Database is connected successfully !");
});

module.exports = conn;
