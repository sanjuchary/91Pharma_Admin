import React, { useState } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Employees = ({ DepartmentName, DesignationName }) => {
  const [paymentMode, setPaymentMode] = useState("");

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const values = [
    {
      name: "code",
      label: "Login User Name",
      type: "text",
      placeholder: "Enter login user name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Password",
      type: "",
      placeholder: "Enter Password",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "min_value",
      label: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "max_value",
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "max_amount",
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "max_amount",
      label: "Phone",
      type: "number",
      placeholder: "Enter Phone Number",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "remarks",
      label: "Employee ID",
      type: "text",
      placeholder: "Enter Remarks",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "remarks",
      label: "Annual Salary",
      type: "text",
      placeholder: "Enter Remarks",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "remarks",
      label: "Address",
      type: "text",
      placeholder: "Enter Remarks",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "category_id",
      label: "Department Name",
      type: "select",
      placeholder: "Select Category",
      defaultValue: null,
      value: "",
      options: DepartmentName?.data,
      isMulti: false,
    },
    {
      name: "category_id",
      label: "Designation Name",
      type: "select",
      placeholder: "Select Category",
      defaultValue: null,
      value: "",
      options: DesignationName?.data,
      isMulti: false,
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Employees Create", url: "/a/employees" },
        ]}
      />
      <Form
        values={values}
        isMultiPart={true}
        redirectUrl="/a/employees"
        formType="payment"
        api={{
          update: { method: "post", url: `/employees/add` },
        }}
      />
    </div>
  );
};

Employees.layout = "Admin";
export default Employees;

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  const DepartmentNameResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_PROD_API_URL}/departments/get-all`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const DesignationNameResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_PROD_API_URL}/designations/get-all`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const DepartmentName = DepartmentNameResponse.data?.data;
  const DesignationName = DesignationNameResponse.data?.data;

  return {
    props: { DepartmentName, DesignationName },
  };
}
