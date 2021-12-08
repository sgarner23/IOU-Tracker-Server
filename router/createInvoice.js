const express = require("express");
const router = express.Router();
const createInvoiceCtrl = require("../controller/createInvoiceController");
const { validateUser } = require("../middleware/validateUser");

router.post("/api/invoice", validateUser, createInvoiceCtrl.addNewInvoice);
router.put("/api/mark-as-paid", validateUser, createInvoiceCtrl.markAsPaid);
router.put("/api/edit", validateUser, createInvoiceCtrl.editInvoice);

module.exports = router;
