var Account = require("../models/account.model");

exports.list = (req, res) => {
  Account.getAll((data) => {
    res.send({ result: data });
  });
};

exports.detail = (req, res) => {
  Account.getByID(req.params.id, (data) => {
    if (!data) return res.status(404).send("ID not found.");
    res.send({ result: data });
  });
};

exports.add = (req, res) => {
  Account.add(
    req.body.id,
    req.body.username,
    req.body.password,
    req.body.owner,
    (data) => {
      if (data == 200) {
        Account.getByID(req.body.id, (data) => {
          res.send({ result: data });
        });
      }
    }
  );
};
