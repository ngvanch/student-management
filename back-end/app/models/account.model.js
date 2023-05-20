const db = require("../config/dbConnection");
const asyncHandler = require("express-async-handler");
const Account = (account) => {
  this.id = account.id;
  this.username = account.username;
  this.password = account.password;
  this.idAdmin = account.isAdmin;
  this.owner = account.owner;
};

Account.find = asyncHandler(async () => {
  let sql = `SELECT id, tendn as username, matkhau as password FROM taikhoan`;
  const [accounts] = await db.query(sql);
  return accounts;
});

Account.findByID = asyncHandler(async (data) => {
  let sql = `SELECT id, tendn as username, matkhau as password 
            FROM taikhoan 
            WHERE id = ?`;
  const [account] = await db.query(sql, [data.id]);
  return account.length != 0 ? account : null;
});

Account.findByUsername = asyncHandler(async (data) => {
  let sql = `SELECT id, tendn as username, matkhau as password, isAdmin 
            FROM taikhoan 
            WHERE tendn = ?`;
  const [account] = await db.query(sql, [data.username]);
  return account.length != 0 ? account : null;
});

Account.create = asyncHandler(async (data) => {
  const account = await Account.findByUsername(data);
  if (account) return -409; // Error: Account already exists
  let sql = `INSERT INTO taikhoan(tendn, matkhau, isAdmin, nguoidung) 
            VALUES (?, ?, ?, ?)`;
  await db.query(sql, [data.username, data.password, data.isAdmin, data.owner]);
  return Account.findByUsername(data);
});

Account.update = asyncHandler(async (data, params) => {
  let sql = `UPDATE taikhoan 
            SET matkhau = ?, isAdmin = ?, nguoidung = ? 
            WHERE id = ?`;
  await db.query(sql, [data.password, data.isAdmin, data.owner, params.id]);
  return Account.findByID(params);
});

Account.delete = asyncHandler(async (data) => {
  let sql = `DELETE FROM taikhoan 
            WHERE id = ?;`;
  await db.query(sql, [data.id]);
  return Account.find();
});

module.exports = Account;
