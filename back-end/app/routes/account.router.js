const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");

router
  .route("/")
  .get(accountController.getAll)
  .post(accountController.addAccount);
router
  .route("/:id")
  .get(accountController.getAccount)
  .put(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;
