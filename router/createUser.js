const express = require("express");
const router = express.Router();
const createUserCtrl = require("../controller/userController");

router.post("/api/user", createUserCtrl.storeNewUser);

module.exports = router;
