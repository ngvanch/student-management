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
  if (error) return res.status(400).send(error.details[0].message);

  Account.add(req.body, (data) => {
    if (data == 200) {
      Account.getByID(req.body.id, (data) => {
        res.send({ result: data });
      });
    } else res.send(data);
  });
};

exports.changePassword = (req, res) => {
  Account.getByID(req.params.id, (data) => {
    if (!data) return res.status(404).send("ID not found.");

    const schema = Joi.object({
      id: Joi.string().min(1).required(),
      password: Joi.string().min(5).required(),
    });
    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    Account.changePassword(req.body, (data) => {
      if (!data) return res.status(500).send("Khong the thay doi mat khau.");
      else
        Account.getByID(req.body.id, (data) => {
          res.send({ result: data });
        });
    });
  });
};

function validationAccount(account) {
  const schema = Joi.object({
    id: Joi.string().min(1).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
    owner: Joi.string().min(0).required(),
  });

  return schema.validate(account);
}
