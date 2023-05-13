const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");

// Get account list
router.get("/users/", accountController.list);
router.get("/users/:id/", accountController.detail);
router.post("/users/", accountController.add);
router.put("/users/:id/change-password/", accountController.changePassword);

module.exports = router;
