import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Departments = () => {
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
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Departments Edit", url: "/a/departments" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/departments/${id}` },
            // update: { method: "patch", url: `/payments/${id}` },
          }}
        />
      )}
    </div>
  );
};
Departments.layout = "Admin";
export default Departments;
