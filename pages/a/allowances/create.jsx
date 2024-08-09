import React, { useState } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Allowances = () => {
  const values = [
    {
      name: "code",
      label: "Allowance Type Name",
      type: "text",
      placeholder: "Enter Allowance Type Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Exemption Limit",
      type: "",
      placeholder: "Enter Exemption Limit",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Description",
      type: "",
      placeholder: "Enter Description",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Percentage on base pay",
      type: "",
      placeholder: "Enter percentage",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Fixed Amount on base pay",
      type: "",
      placeholder: "Enter Amount",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Eligibility",
      type: "",
      placeholder: "Enter Eligibility",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Reimbursement",
      type: "",
      placeholder: "Enter Reimbursement",
      value: "",
      customClass: "col-md-3 col-12",
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Allowances Create", url: "/a/allowances" },
        ]}
      />
      <Form
        values={values}
        isMultiPart={true}
        redirectUrl="/a/allowances"
        formType="payment"
        api={{
          update: { method: "post", url: `/allowances/add` },
        }}
      />
    </div>
  );
};

Allowances.layout = "Admin";
export default Allowances;
