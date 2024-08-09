import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Allowances = () => {
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
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Allowances Edit", url: "/a/allowances" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/allowances/${id}` },
            // update: { method: "patch", url: `/payments/${id}` },
          }}
        />
      )}
    </div>
  );
};
Allowances.layout = "Admin";
export default Allowances;
