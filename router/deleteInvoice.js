const express = require("express");
const router = express.Router();
const deleteUserCtrl = require("../controller/deleteInvoiceController");
const { validateUser } = require("../middleware/validateUser");

router.delete("/api/delete/:id", validateUser, deleteUserCtrl.deleteInvoice);

module.exports = router;
