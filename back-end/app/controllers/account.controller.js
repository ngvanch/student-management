const Joi = require("joi");
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
  const { error } = validationAccount(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

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

function validationAccount(account) {
  const schema = {
    id: Joi.string().min(1).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
    owner: Joi.string().min(1).required(),
  };

  return Joi.validate(account, schema);
}
