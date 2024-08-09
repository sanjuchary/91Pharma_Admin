import React, { useState } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Departments = () => {
  const [paymentMode, setPaymentMode] = useState("");

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const values = [
    {
      name: "code",
      label: "Department Name",
      type: "text",
      placeholder: "Enter Department name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Department Code",
      type: "",
      placeholder: "Enter Department Code",
      value: "",
      customClass: "col-md-3 col-12",
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Department Create", url: "/a/departments" },
        ]}
      />
      <Form
        values={values}
        isMultiPart={true}
        redirectUrl="/a/departments"
        formType="payment"
        api={{
          update: { method: "post", url: `/departments/add` },
        }}
      />
    </div>
  );
};

Departments.layout = "Admin";
export default Departments;
