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
      name: "phone_number",
      label: "Shop Name",
      type: "text",
      placeholder: "Enter Shop Name",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "phone_number",
      label: "Shop ID",
      type: "text",
      placeholder: "Enter Shop ID",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter First name",
      value: "",
      customClass: "col-md-6",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-6",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-6",
    },
    {
      name: "phone_number",
      label: "Mobile Number",
      type: "text",
      placeholder: "Enter Mobile number",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "wallet_balance",
      label: "Wallet Balance",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-6",
    },
    {
      name: "referral_code",
      label: "Referral Code",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-6",
    },
    {
      name: "sanction_credit",
      label: "Sanction credit",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-6",
    },
    {
      name: "sanction_amount",
      label: "Sanction amount",
      type: "text",
      placeholder: "Enter Last Limit",
      value: "",
      customClass: "col-md-6",
    },
    {
      name: "due",
      label: "Due amount",
      type: "text",
      placeholder: "Enter Due Amount",
      value: "",
      customClass: "col-md-6",
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
