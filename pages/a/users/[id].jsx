import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required"),
    phone_ext: Yup.string().required("Phone extension is required"),
    phone_number: Yup.string().required("Phone number is required"),
    status: Yup.string().required("Status is required"),
  });

  const values = [
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      value: "",
      customClass: "col-12",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      value: "",
      customClass: "col-12",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter email",
      value: "",
      customClass: "col-12",
    },
    {
      name: "phone_ext",
      label: "Phone Extension",
      type: "text",
      placeholder: "Enter phone extension",
      value: "",
      customClass: "col-12",
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter phone number",
      value: "",
      customClass: "col-12",
    },
    {
      name: "address",
      label: "Address",
      type: "json",
      placeholder: "Enter address",
      value: "",
      customClass: "col-12",
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      placeholder: "Enter status",
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
          { text: "Users", url: "/a/users" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/users/${id}` },
            update: { method: "patch", url: `/users/${id}` },
          }}
        />
      )}
    </div>
  );
};
User.layout = "Admin";
export default User;
