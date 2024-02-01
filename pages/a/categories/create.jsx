import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import { getOptions } from "../../../helpers/common/dropdownHelper";

const Category = ({ filters, types }) => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // image: Yup.mixed().required("Image is required"),
  });

  const values = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Category name",
      value: "",
      customClass: "col-12",
    },
    // {
    //   name: "type",
    //   label: "Select Filter Type",
    //   type: "select",
    //   placeholder: "Enter Filter type",
    //   defaultValue: null,
    //   value: "",
    //   options: types,
    // },
    // {
    //   name: "parent_id",
    //   label: "Select Parent Category",
    //   type: "select",
    //   placeholder: "Select Category",
    //   defaultValue: null,
    //   value: "",
    //   options: filters,
    // },

    // {
    //   name: "image",
    //   label: "Image",
    //   type: "file",
    //   placeholder: "Upload Category image",
    //   value: "",
    //   isSingle: true,
    // },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Category", url: "/a/categories" },
        ]}
      />
      <Form
        values={values}
        schema={schema}
        isMultiPart={false}
        redirectUrl="/a/categories"
        formType="category"
        api={{
          update: { method: "post", url: `/category/add` },
        }}
      />
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const [filters, types] = await Promise.all([
//     await getOptions("filters/list", "name", "uuid", false),
//     await getOptions("filters/types", "name", "value", true),
//   ]);

//   return {
//     props: {
//       filters: filters,
//       types: types,
//     },
//   };
// }
Category.layout = "Admin";
export default Category;
