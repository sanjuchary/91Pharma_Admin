import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Coupon = () => {
  const schema = Yup.object().shape({
    form_type: Yup.string().required("Form type is required"),
  });

  const values = [
    {
      name: "form_type",
      label: "Form Type",
      type: "text",
      placeholder: "Enter Form Type",
      value: "",
      customClass: "col-12",
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Create Form type", url: "/a/form-types" },
        ]}
      />
      <Form
        values={values}
        schema={schema}
        isMultiPart={true}
        api={{
          get: {
            method: "post",
            url: `/form-type/add`,
          },
        }}
        formType="form"
      />
    </div>
  );
};
Coupon.layout = "Admin";
export default Coupon;
