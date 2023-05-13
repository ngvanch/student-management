var Account = require("../models/account.model");

exports.home = (req, res) => {
  res.send("Hello Page");
};

exports.about = (req, res) => {
  res.send("About Page");
};
