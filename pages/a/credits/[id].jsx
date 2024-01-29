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
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter User name",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "limit",
      label: "Credit Limit",
      type: "text",
      placeholder: "Enter Credit Limit",
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
