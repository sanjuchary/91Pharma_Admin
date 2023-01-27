import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import { getOptions } from "../../../helpers/common/dropdownHelper";

const Organization = ({ organizations }) => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phone_ext: Yup.string().required("Phone Ext is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
  });

  const values = [
    //name
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Organization name",
      value: "",
      customClass: "col-12",
    },

    //website
    {
      name: "website",
      label: "Website",
      type: "text",
      placeholder: "Enter Organization website",
      value: "",
      customClass: "col-12",
    },
    //address
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter Organization address",
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

    {
      name: "parent_id",
      label: "Parent Organization",
      type: "select",
      placeholder: "Select organization",
      value: "",
      options: organizations,
      customClass: "col-12",
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Organizations", url: "/a/organizations" },
        ]}
      />
      <Form
        values={values}
        schema={schema}
        isMultiPart={false}
        redirectUrl="/a/organizations"
        api={{
          update: { method: "post", url: `/organization` },
        }}
      />
    </div>
  );
};
export async function getServerSideProps(context) {
  const { id } = context.query;

  const [options] = await Promise.all([
    await getOptions("organization", "name", "uuid", false),
  ]);

  return {
    props: {
      organizations: options,
    },
  };
}
Organization.layout = "Admin";
export default Organization;
