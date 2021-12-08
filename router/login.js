const express = require("express");
const router = express.Router();
const loginCtrl = require("../controller/loginController");

router.post("/api/login", loginCtrl.loginUser);

module.exports = router;
