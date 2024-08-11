import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Expiry = () => {
  const schema = Yup.object().shape({
    form_type: Yup.string().required("Form type is required"),
  });

  const values = [
    {
      name: "form_type",
      label: "Product Name",
      type: "text",
      placeholder: "Enter Product Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "form_type",
      label: "Product ID",
      type: "text",
      placeholder: "Enter Product ID",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "form_type",
      label: "Shop Name",
      type: "text",
      placeholder: "Enter Shop Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "form_type",
      label: "Expiry Date",
      type: "text",
      placeholder: "Enter Expiry Date",
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
          { text: "Create Expiry", url: "/a/expiry" },
        ]}
      />
      <Form
        values={values}
        schema={schema}
        isMultiPart={true}
        api={{
          get: {
            method: "post",
            url: `/expiry/add`,
          },
        }}
        formType="expiry"
      />
    </div>
  );
};
Expiry.layout = "Admin";
export default Expiry;
