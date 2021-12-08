async function deleteInvoice(req, res) {
  try {
    const db = req.app.get("db");

    const { id } = req.params;

    const deletedLineItems = await db.line_items.destroy({
      invoice_id: id,
    });

    const deletedInvoice = await db.invoice.destroy({
      id,
    });

    res.status(200).send({ deletedInvoice });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating invoice");
  }
}

module.exports = {
  deleteInvoice,
};
