import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import { getOptions } from "../../../helpers/common/dropdownHelper";
import axios from "axios";

const subCategory = ({ categories }) => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // image: Yup.mixed().required("Image is required"),
  });

  const values = [
    {
      name: "name",
      label: "Sub-Category Name",
      type: "text",
      placeholder: "Enter Category name",
      value: "",
      customClass: "col-12",
    },
    // {
    //   name: "parentId",
    //   label: "Parent Category",
    //   type: "text",
    //   placeholder: "Enter Category name",
    //   value: "",
    //   customClass: "col-12",
    // },
    // {
    //   name: "type",
    //   label: "Select Filter Type",
    //   type: "select",
    //   placeholder: "Enter Filter type",
    //   defaultValue: null,
    //   value: "",
    //   options: types,
    // },
    {
      name: "category_id",
      label: "Select Parent Category",
      type: "select",
      placeholder: "Select Category",
      defaultValue: null,
      value: "",
      options: categories.data,
      isMulti: false,
    },

    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Upload SubCategory image",
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
          { text: "Category", url: "/a/subCategories" },
        ]}
      />
      <Form
        values={values}
        schema={schema}
        isMultiPart={false}
        redirectUrl="/a/subCategories"
        formType="subCategory"
        api={{
          update: { method: "post", url: `/sub-category/add` },
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

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  const categoriesResponse = await axios.get(
    `https://admin.91pharma.in/api/v1/category/get-all`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const categories = categoriesResponse.data?.data;

  return {
    props: { categories },
  };
}

subCategory.layout = "Admin";
export default subCategory;
