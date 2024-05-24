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
    // description: Yup.string().required("Description is required"),
    // context: Yup.string().required("Context is required"),
  });

  const values = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter brand name",
      value: "",
      customClass: "col-12",
    },
    // {
    //   name: "description",
    //   label: "Description",
    //   type: "text",
    //   placeholder: "Enter brand description",
    //   value: "",
    //   customClass: "col-12",
    // },
    // {
    //   name: "context",
    //   label: "Context",
    //   type: "textarea",
    //   placeholder: "Enter brand context",
    //   value: "",
    // },
    // {
    //   name: "parent_id",
    //   label: "Parent Brand",
    //   type: "select",
    //   placeholder: "Select parent brand",
    //   value: "",
    //   options: options,
    //   defaultValue: defaultValue,
    // },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Enter brand image",
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
          { text: "Brands", url: "/a/brands" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/brand/get/by/${id}` },
            update: { method: "patch", url: `/brands/${id}` },
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
