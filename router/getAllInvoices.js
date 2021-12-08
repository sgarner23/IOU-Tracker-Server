const express = require("express");
const router = express.Router();
const getInvoicesCtrl = require("../controller/getInvoicesController");
const { validateUser } = require("../middleware/validateUser");

router.get("/api/all", validateUser, getInvoicesCtrl.getInvoices);
router.get("/api/user-invoice", validateUser, getInvoicesCtrl.findInvoice);
router.get("/api/line-items/:id", validateUser, getInvoicesCtrl.findLineItems);

module.exports = router;
