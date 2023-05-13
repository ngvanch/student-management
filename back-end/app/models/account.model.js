const db = require("../config/dbConnection");

const Account = (account) => {
  this.id = account.id;
  this.username = account.username;
  this.password = account.password;
  this.owner = account.owner;
};

Account.add = (id, username, password, owner, result) => {
  var sql;
  if (owner == null || owner == "")
    sql = `INSERT INTO TAIKHOAN(id, tendn, matkhau, nguoidung) VALUES ("${id}", "${username}", "${password}", ${null})`;
  else
    sql = `INSERT INTO TAIKHOAN(id, tendn, matkhau, nguoidung) VALUES ("${id}", "${username}", "${password}", "${owner}")`;
  db.query(sql, (err, account) => {
    if (err) result("Khong the them tai khoan.");
    else result(200);
  });
};

Account.getAll = (result) => {
  let sql = `SELECT id, tendn as username, matkhau as password FROM taikhoan`;
  db.query(sql, (err, account) => {
    if (err) result(null);
    else result(account);
  });
};

Account.getByID = (id, result) => {
  let sql = `SELECT id, tendn as username, matkhau FROM taikhoan WHERE id like "${id}"`;
  db.query(sql, (err, account) => {
    if (err || account.length == 0) result(null);
    else result(account[0]);
  });
};

module.exports = Account;
