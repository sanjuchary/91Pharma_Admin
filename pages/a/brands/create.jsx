import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import { getOptions } from "../../../helpers/common/dropdownHelper";

const Brand = ({ brands }) => {
  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // description: Yup.string().required("Description is required"),
    // context: Yup.string().required("Context is required"),
    // image: Yup.mixed().required("Image is required"),
  });

  const values = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter brand name",
      value: "",
      customClass: "col-md-6 col-12",
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
    //   label: "Select Parent Brand",
    //   type: "select",
    //   placeholder: "Select brand",
    //   defaultValue: null,
    //   value: "",
    //   options: brands,
    // },

    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Upload Category image",
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
      <Form
        values={values}
        schema={schema}
        isMultiPart={true}
        redirectUrl="/a/brands"
        formType="brand"
        api={{
          update: { method: "post", url: `/brand/add` },
        }}
      />
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const [options] = await Promise.all([
//     await getOptions("brands", "name", "uuid", false),
//   ]);
//   return {
//     props: {
//       brands: options,
//     },
//   };
// }
Brand.layout = "Admin";
export default Brand;
