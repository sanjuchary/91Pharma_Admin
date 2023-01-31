import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Doctor = () => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    title: Yup.string().required("Title is required"),
    phone_ext: Yup.string().required("Phone Ext is required"),
    phone_number: Yup.string().required("Phone Number is required"),
  });

  const values = [
    //first_name
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      value: "",
      customClass: "col-12",
    },
    //last_name
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
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
    //password
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      value: "",
      customClass: "col-12",
    },
    //title
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter title",
      value: "",
      customClass: "col-12",
    },
    //gender
    {
      name: "gender",
      label: "Gender",
      type: "text",
      placeholder: "Enter Gender",
      value: "",
      customClass: "col-12",
    },
    //image
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "upload profile image",
      value: "",
      isSingle: true,
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Doctors", url: "/a/doctors" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/doctor/${id}` },
            update: { method: "patch", url: `/doctor/${id}` },
          }}
        />
      )}
    </div>
  );
};
Doctor.layout = "Admin";
export default Doctor;
