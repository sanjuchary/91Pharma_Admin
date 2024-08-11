import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import { getOptions } from "../../../helpers/common/dropdownHelper";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Category = ({ filters, types }) => {
  // const schema = Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
  //   // image: Yup.mixed().required("Image is required"),
  // });

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    image: Yup.mixed().required("Image is required"),
  });

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = async (data) => {
  //   const formData = new FormData();
  //   formData.append("name", data.name);
  //   formData.append("image", data.image[0]); // Assuming single file upload

  //   try {
  //     const response = await axios.post("/category/add", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if (response.status === 200) {
  //       alert("Category added successfully!");
  //       // Redirect or perform other actions
  //     } else {
  //       alert("Failed to add category.");
  //     }
  //   } catch (error) {
  //     console.error("There was an error adding the category!", error);
  //     alert("An error occurred while adding the category.");
  //   }
  // };

  const values = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Category name",
      value: "",
      customClass: "col-md-6 col-12",
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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
            )}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="form-group">
          <label>Image</label>
          <Controller
            name="image"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <input
                type="file"
                {...field}
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                onChange={(e) => field.onChange(e.target.files)}
              />
            )}
          />
          <div className="invalid-feedback">{errors.image?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form> */}
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
