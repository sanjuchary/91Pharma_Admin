import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Employees = () => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    discount: Yup.number().required("Discount is required"),
    min_value: Yup.number().required("Min Value is required"),
    max_value: Yup.number().required("Max Value is required"),
    max_amount: Yup.number().required("Max Amount is required"),
    expiry_date: Yup.date().required("Expiry Date is required"),
  });

  const values = [
    {
      name: "code",
      label: "Shop ID",
      type: "text",
      placeholder: "Enter Shop Id",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "discount",
      label: "Shop Name",
      type: "number",
      placeholder: "Enter Shop Name",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "min_value",
      label: "Collector ID",
      type: "number",
      placeholder: "Enter min value",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "max_value",
      label: "Collector Name",
      type: "number",
      placeholder: "Enter max value",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "max_amount",
      label: "Amount Paid",
      type: "number",
      placeholder: "Enter max amount",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "expiry_date",
      label: "payment mode",
      type: "date",
      placeholder: "Enter expiry date",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "max_amount",
      label: "Remarks",
      type: "number",
      placeholder: "Enter max amount",
      value: "",
      customClass: "col-md-6 col-12",
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Employees Edit", url: "/a/employees" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/employees/${id}` },
            // update: { method: "patch", url: `/payments/${id}` },
          }}
        />
      )}
    </div>
  );
};
Employees.layout = "Admin";
export default Employees;
