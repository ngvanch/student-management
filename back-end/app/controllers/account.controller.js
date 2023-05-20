const Joi = require("joi");
const asyncHandler = require("express-async-handler");
var Account = require("../models/account.model");

exports.getAll = asyncHandler(async (req, res) => {
  const accounts = await Account.find();
  res
    .status(201)
    .json({ success: true, count: accounts.length, data: accounts });
});

exports.getAccount = asyncHandler(async (req, res) => {
  const account = await Account.findByID(req.params);
  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  res.status(201).json({ success: true, data: account });
});

exports.addAccount = asyncHandler(async (req, res) => {
  const { error } = validationAccount(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const account = await Account.create(req.body);
  if (account == -409) {
    res.status(409);
    throw new Error("Account already exists");
  }

  res.status(201).json({ success: true, data: account });
});

exports.updateAccount = asyncHandler(async (req, res) => {
  let account = await Account.findByID(req.params);
  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  const { error } = validationAccount(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  account = await Account.update(req.body, req.params);
  res.status(201).json({ success: true, data: account });
});

exports.deleteAccount = asyncHandler(async (req, res) => {
  let account = await Account.findByID(req.params);
  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }
  /* 
  if (req.user.id !== account.id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  } */

  const accounts = await Account.delete(req.params);
  res
    .status(201)
    .json({ success: true, count: accounts.length, data: accounts });
});

function validationAccount(account) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
    isAdmin: Joi.boolean().required(),
    owner: Joi.string().min(0),
  });

  return schema.validate(account);
}
