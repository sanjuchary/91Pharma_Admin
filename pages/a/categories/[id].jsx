import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import {
  getOptions,
  getDefaultValue,
  getDefaultValueForType,
} from "../../../helpers/common/dropdownHelper";

const Category = ({ filters, types, defaultValueFilter, defaultValueType }) => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
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
      name: "type",
      label: "Type",
      type: "select",
      placeholder: "Enter category type",
      value: "",
      defaultValue: defaultValueType,
      options: types,

      customClass: "col-12",
    },

    {
      name: "parent_id",
      label: "Select Parent Category",
      type: "select",
      placeholder: "Select category",
      defaultValue: defaultValueFilter,
      value: "",
      options: filters,
      customClass: "col-12",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Enter categorie image",
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
          { text: "Categories", url: "/a/categories" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={false}
          api={{
            get: { method: "get", url: `/filters/${id}` },
            update: { method: "patch", url: `/filters/${id}` },
          }}
        />
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  const { id } = context.query;

  const [filters, types, defaultValueFilter, defaultValueType] =
    await Promise.all([
      await getOptions("filters/list", "name", "uuid", false),
      await getOptions("filters/types", "name", "value", true),
      await getDefaultValue("filters", "parent", id),
      await getDefaultValueForType("filters", id),
    ]);

  return {
    props: {
      filters: filters,
      types: types,
      defaultValueFilter: defaultValueFilter,
      defaultValueType: defaultValueType,
    },
  };
}
Category.layout = "Admin";
export default Category;
