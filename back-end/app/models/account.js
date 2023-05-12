const Account = (account) => {
  this.id = account.id;
  this.username = account.username;
  this.password = account.password;
};

Account.getAll = (result) => {
  var data = [
    { id: 0, username: "admin", password: "123456" },
    { id: 1, username: "user", password: "123456" },
  ];

  result(data);
};

Account.getByID = (id) => {
  var data = { id: id, username: "test", password: "123" };

  return data;
};

module.exports = Account;
