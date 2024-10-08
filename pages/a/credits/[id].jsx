import axios from "../../../utils/axios";
import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import {
  getOptions,
  getDefaultValue,
} from "../../../helpers/common/dropdownHelper";

const Brand = ({ defaultValue, options }) => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    context: Yup.string().required("Context is required"),
  });

  const values = [
    {
      name: "store_detail.shop_name",
      label: "Shop Name",
      type: "text",
      placeholder: "Enter Shop Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "store_detail.id",
      label: "Shop ID",
      type: "text",
      placeholder: "Enter Shop ID",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter First name",
      value: "",
      customClass: "col-md-3",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-3",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-3",
    },
    {
      name: "store_detail.phone_number",
      label: "Mobile Number",
      type: "text",
      placeholder: "Enter Mobile number",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "wallet_balance",
      label: "Wallet Balance",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-3",
    },
    {
      name: "referral_code",
      label: "Referral Code",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-3",
    },
    {
      name: "sanction_credit",
      label: "Sanction credit",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-3",
    },
    {
      name: "sanction_amount",
      label: "Sanction amount",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-3",
    },
    {
      name: "due",
      label: "Due amount",
      type: "text",
      placeholder: "Enter Due Amount",
      value: "",
      customClass: "col-md-3",
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Credits", url: "/a/credits" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={false}
          redirectUrl="/a/credits"
          api={{
            get: { method: "get", url: `/users/getUser?id=${id}` },
            // get: { method: "get", url: `/shop-details/get-all?id=${id}` },
            // update: { method: "patch", url: `/users/sanctionCredit` },
          }}
        />
      )}
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   const [defaultValue, options] = await Promise.all([
//     await getDefaultValue("brands", "parent", id),
//     await getOptions("brands", "name", "uuid", false),
//   ]);

//   return {
//     props: {
//       defaultValue: defaultValue,
//       options: options,
//     },
//   };
// }
Brand.layout = "Admin";
export default Brand;
