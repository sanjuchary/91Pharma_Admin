import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Lab = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phone_ext: Yup.string().required("Phone Ext is required"),
    phone_number: Yup.string().required("Phone Number is required"),
  });

  const values = [
    //name
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Lab name",
      value: "",
      customClass: "col-12",
    },
    //content
    {
      name: "content",
      label: "Content",
      type: "textarea",
      placeholder: "Enter Lab content",
      value: "",
      customClass: "col-12",
    },
    //website
    {
      name: "website",
      label: "Website",
      type: "text",
      placeholder: "Enter Lab website",
      value: "",
      customClass: "col-12",
    },
    //address
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter Lab address",
      value: "",
      customClass: "col-12",
    },
    //email
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      value: "",
      customClass: "col-12",
    },
    //phone_ext
    {
      name: "phone_ext",
      label: "Phone Ext",
      type: "text",
      placeholder: "Enter phone ext",
      value: "",
      customClass: "col-12",
    },
    //phone_number
    {
      name: "phone_number",
      label: "Phone Number",
      type: "Number",
      placeholder: "Enter phone number",
      value: "",
      customClass: "col-12",
    },
    //image
    {
      name: "logo",
      label: "Logo",
      type: "file",
      placeholder: "Upload image",
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
          { text: "Labs", url: "/a/labs" },
        ]}
      />

      <Form
        values={values}
        schema={schema}
        isMultiPart={true}
        api={{
          update: { method: "post", url: `/lab` },
        }}
      />
    </div>
  );
};

Lab.layout = "Admin";
export default Lab;
