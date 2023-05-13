const db = require("../config/dbConnection");

const Account = (account) => {
  this.id = account.id;
  this.username = account.username;
  this.password = account.password;
  this.owner = account.owner;
};

Account.add = (account, result) => {
  if (account.owner == null || account.owner == "")
    sql = `INSERT INTO taikhoan(id, tendn, matkhau, nguoidung) VALUES ("${
      account.id
    }", "${account.username}", "${account.password}", ${null})`;
  else
    sql = `INSERT INTO taikhoan(id, tendn, matkhau, nguoidung) VALUES ("${account.id}", 
    "${account.username}", "${account.password}", "${account.owner}")`;
  db.query(sql, (err) => {
    if (err && err.code == "ER_DUP_ENTRY") result("Tai khoan da ton tai.");
    else if (err) result(null);
    else result(200);
  });
};

Account.changePassword = (account, result) => {
  let sql = `UPDATE taikhoan SET matkhau = "${account.password}" WHERE id = "${account.id}"`;
  db.query(sql, (err, account) => {
    if (err) result(null);
    else result(account);
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
  let sql = `SELECT id, tendn as username, matkhau FROM taikhoan WHERE id = "${id}"`;
  db.query(sql, (err, account) => {
    if (err || account.length == 0) result(null);
    else result(account[0]);
  });
};

module.exports = Account;
