import React, { useEffect, useContext, useState } from "react";
import { userContext } from "../store/userStore";
import GoBack from "../components/GoBack";
import Header from "../components/Header";
import InvoiceFooter from "../components/InvoiceFooter";
import LineItemDetails from "../components/LineItemDetails";
import Card from "../components/UI/Card";
import LoginButton from "../components/UI/LoginButton";
import { useParams } from "react-router";

import StatusDiv from "../components/UI/StatusDiv";
import getSingleInvoice from "../api/getSingleInvoice";
import "./Invoice.css";

function Invoice() {
  const { state, dispatch } = useContext(userContext);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [orderDate, setOrderDate] = useState("");
  const { id } = useParams();

  state.usersInvoices.forEach((invoice) => {
    if (invoice.id === +id && selectedInvoice.id !== +id) {
      setSelectedInvoice(invoice);
    }
  });

  function formatDate(date) {
    const invoiceDate = new Date(date);
    let dateMiliSecs = Date.parse(invoiceDate);
    let formattedDate = new Date(dateMiliSecs).toDateString();
    let dateArr = formattedDate.split(" ");
    const newDateArr = [dateArr[2], dateArr[1], dateArr[3]];
    return newDateArr.join(" ");
  }

  useEffect(() => {
    const invoiceDate = formatDate(selectedInvoice.order_date);
    setOrderDate(invoiceDate);
    console.log(selectedInvoice);
  }, [selectedInvoice]);

  // const invoice = await getSingleInvoice(id);
  // console.log(invoice);

  return (
    <React.Fragment>
      <Header />
      <div className="page-container">
        <div className="page-container-2">
          <GoBack />
          <Card classes={"card-wrapper lighter-shadow"}>
            <div className="status-wrapper">
              <p className="status-text-invoicepg">Status</p>
              <StatusDiv invoiceStatus={selectedInvoice.is_paid} />
            </div>
          </Card>

          <Card classes={"card-wrapper lighter-shadow"}>
            <div className="invoice-content-container">
              <div className="invoice-description-container">
                <p className="invoice-num inline">
                  <span className="num-sign">#</span>
                  {`IOU${selectedInvoice.id}`}
                </p>
                <p className="description-text lighter-text">
                  {selectedInvoice.project_type}
                </p>
              </div>
              <div className="address-container">
                <p className="lighter-text smaller-text address">
                  {selectedInvoice.user_street_address}
                </p>
                <p className="lighter-text smaller-text address">
                  {`${selectedInvoice.user_city} ${selectedInvoice.user_state} ${selectedInvoice.user_zip}`}
                </p>
                <p className="lighter-text smaller-text address">
                  {`${selectedInvoice.user_country}`}
                </p>
              </div>
              <div className="invoice-date-name-container">
                <div className="invoice-date-payment">
                  <p className="smaller-text lighter-text client-details">
                    Invoice Date
                  </p>
                  <p className="bigger-text darker-text">{orderDate}</p>
                  <p className="smaller-text lighter-text payment-due client-details">
                    Payment Due
                  </p>
                  <p className="bigger-text darker-text">
                    {selectedInvoice.payment_date}
                  </p>
                </div>
                <div className="client-name-address-container">
                  <p className="smaller-text lighter-text client-details">
                    Bill To
                  </p>
                  <p className="bigger-text darker-text">
                    {selectedInvoice.client_name}
                  </p>
                  <p className="lighter-text smaller-text address-pad address ">
                    {selectedInvoice.client_street_address}
                  </p>
                  <p className="lighter-text smaller-text address">
                    {`${selectedInvoice.client_city} ${selectedInvoice.client_state} ${selectedInvoice.client_zip} ${selectedInvoice.client_country}`}
                  </p>
                </div>
              </div>
              <div className="sent-to-container">
                <p className="lighter-text smaller-text">Sent to</p>
                <p className="bigger-text darker-text">
                  {selectedInvoice.client_email}
                </p>
              </div>
            </div>
            <LineItemDetails subtotal={selectedInvoice.subtotal} />
          </Card>
          <div className="margin-div"></div>
          <InvoiceFooter>
            <LoginButton classes={"invoice-footer-btn discard"}>
              Edit
            </LoginButton>
            <LoginButton classes={"invoice-footer-btn draft delete"}>
              Delete
            </LoginButton>
            <LoginButton classes={"active invoice-footer-btn mark-as-paid"}>
              Mark as Paid
            </LoginButton>
          </InvoiceFooter>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Invoice;