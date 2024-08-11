import React, { useState } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Payments = () => {
  const [paymentMode, setPaymentMode] = useState("");

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const values = [
    {
      name: "code",
      label: "Shop ID",
      type: "text",
      placeholder: "Enter Shop Id",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Shop Name",
      type: "number",
      placeholder: "Enter Shop Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "min_value",
      label: "Collector ID",
      type: "number",
      placeholder: "Enter collector id",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "max_value",
      label: "Collector Name",
      type: "number",
      placeholder: "Enter Collector name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "max_amount",
      label: "Amount Paid",
      type: "number",
      placeholder: "Enter Amount paid",
      value: "",
      customClass: "col-md-3 col-12",
    },
    ...(paymentMode === "cheque"
      ? [
          {
            name: "cheque_number",
            label: "Cheque Number",
            type: "text",
            placeholder: "Enter Cheque Number",
            value: "",
            customClass: "col-md-3 col-12",
          },
          {
            name: "cheque_date",
            label: "Cheque Date",
            type: "date",
            placeholder: "Enter Cheque Date",
            value: "",
            customClass: "col-md-3 col-12",
          },
        ]
      : []),
    ...(paymentMode === "transfer"
      ? [
          {
            name: "bank_name",
            label: "Bank Name",
            type: "text",
            placeholder: "Enter Bank Name",
            value: "",
            customClass: "col-md-3 col-12",
          },
          {
            name: "bank_number",
            label: "Bank Number",
            type: "text",
            placeholder: "Enter Bank Number",
            value: "",
            customClass: "col-md-3 col-12",
          },
        ]
      : []),
    {
      name: "remarks",
      label: "Remarks",
      type: "text",
      placeholder: "Enter Remarks",
      value: "",
      customClass: "col-md-3 col-12",
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Payments", url: "/a/payments" },
        ]}
      />
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        {/* Test Direct Select Rendering */}
        <div className="col-md-6 col-12">
          <label>Payment Mode</label>
          <select value={paymentMode} onChange={handlePaymentModeChange}>
            <option value="">Select Payment Mode</option>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
        <Form
          values={values}
          isMultiPart={true}
          redirectUrl="/a/payments"
          formType="payment"
          api={{
            update: { method: "post", url: `/payments/add` },
          }}
        />
      </div>
    </div>
  );
};

Payments.layout = "Admin";
export default Payments;
