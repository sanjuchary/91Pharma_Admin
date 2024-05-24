import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import {
  getOptions,
  getDefaultValue,
  getDefaultValueForType,
} from "../../../helpers/common/dropdownHelper";
import Image from "next/image";

const Category = ({ filters, types, defaultValueFilter, defaultValueType }) => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    file_name: Yup.mixed()
      .required("A file is required")
      .test("fileSize", "File too large", (value) => {
        return value && value.size <= 2000000; // 2MB
      })
      .test("fileType", "Unsupported File Format", (value) => {
        return (
          value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      }),
  });

  const values = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter category name",
      value: "",
      customClass: "col-12",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Enter category image",
      value: "",
      isSingle: true,
    },
    // {
    //   name: "id",
    //   label: "Select Parent Category",
    //   type: "select",
    //   placeholder: "Select category",
    //   defaultValue: defaultValueFilter,
    //   value: "",
    //   options: filters,
    //   customClass: "col-12",
    // },
    // {
    //   name: "document",
    //   label: "Image",
    //   type: "file",
    //   placeholder: "Enter categorie image",
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
          { text: "Categories", url: "/a/categories" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: {
              method: "get",
              url: `/category/get/by/${id}`,
            },
            // update: { method: "patch", url: `/filters/${id}` },
          }}
        />
        // <Image src={}/>
      )}
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   const [filters, types, defaultValueFilter, defaultValueType] =
//     await Promise.all([
//       await getOptions("filters/list", "name", "uuid", false),
//       await getOptions("filters/types", "name", "value", true),
//       await getDefaultValue("filters", "parent", id),
//       await getDefaultValueForType("filters", id),
//     ]);

//   return {
//     props: {
//       filters: filters,
//       types: types,
//       defaultValueFilter: defaultValueFilter,
//       defaultValueType: defaultValueType,
//     },
//   };
// }
Category.layout = "Admin";
export default Category;
