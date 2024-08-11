/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import {
  getOptions,
  getDefaultValue,
  getDefaultValueForType,
} from "../../../helpers/common/dropdownHelper";

const subCategory = ({
  filters,
  types,
  defaultValueFilter,
  defaultValueType,
}) => {
  const router = useRouter();
  const { id } = router.query;
  console.log("subId", id);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // type: Yup.string().required("Type is required"),
  });

  const values = [
    {
      name: "name",
      label: "Sub-Category Name",
      type: "text",
      placeholder: "Enter Sub-Category name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Enter category image",
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
          { text: "Categories", url: "/a/subCategories" },
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
              url: `/sub-category/get/by/${id}`,
            },
            // update: { method: "patch", url: `/filters/${id}` },
          }}
        />
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
subCategory.layout = "Admin";
export default subCategory;
