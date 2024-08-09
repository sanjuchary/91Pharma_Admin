import React, { useState } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Designations = () => {
  const values = [
    {
      name: "code",
      label: "Designation Name",
      type: "text",
      placeholder: "Enter Designation name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Designation Code",
      type: "",
      placeholder: "Enter Designation Code",
      value: "",
      customClass: "col-md-3 col-12",
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Designation Create", url: "/a/designations" },
        ]}
      />
      <Form
        values={values}
        isMultiPart={true}
        redirectUrl="/a/designations"
        formType="payment"
        api={{
          update: { method: "post", url: `/designations/add` },
        }}
      />
    </div>
  );
};

Designations.layout = "Admin";
export default Designations;
