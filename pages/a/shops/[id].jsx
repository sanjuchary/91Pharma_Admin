import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import Images from "../../../components/products/Images";

import {
  getOptions,
  getDefaultValueByName,
} from "../../../helpers/common/dropdownHelper";
import axios from "../../../utils/axios";

const Shop = ({ filters, brands, defaultFilter, defaultBrand, images }) => {
  const router = useRouter();
  const { id } = router.query;

  const [tab, setTab] = useState(0);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    context: Yup.string().required("Context is required"),
    price: Yup.number().required("Price is required"),
  });

  console.log("Images", images);

  const [values, setValues] = useState([
    {
      name: "shop_name",
      label: "Shop Name",
      type: "text",
      placeholder: "Enter Product name",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter Product description",
      value: "",
      customClass: "col-md-6 col-12",
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
      name: "whatsapp_number",
      label: "Whatsapp Number",
      type: "number",
      placeholder: "Enter Whatsapp Number",
      value: "",
      customClass: "col-md-6 col-12",
    },
    // {
    //   name: "aadhar_number",
    //   label: "Aadhar Number",
    //   type: "number",
    //   placeholder: "Enter Aadhar Number",
    //   value: "",
    //   customClass: "col-md-6 col-12",
    // },
    // {
    //   name: "aadhar_image",
    //   label: "Aadhar Image",
    //   type: "file",
    //   placeholder: "Select Aadhar image",
    //   // value: images.find((img) => img.name === "aadhar_image")?.url || "",
    //   isSingle: true,
    // },
    {
      name: "aadhar_name",
      label: "Aadhar Name",
      type: "text",
      placeholder: "Enter Aadhar Name",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "pan_number",
      label: "Pan Number",
      type: "text",
      placeholder: "Enter Pan Number",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "pan_name",
      label: "Pan Name",
      type: "text",
      placeholder: "Enter Pan Name",
      value: "",
      customClass: "col-md-6 col-12",
    },

    {
      name: "opening_time",
      label: "Opening Time",
      type: "text",
      placeholder: "Enter Opening Time",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "closing_time",
      label: "Closing Time",
      type: "text",
      placeholder: "Enter Closing Time",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "gst_number",
      label: "GST Number",
      type: "text",
      placeholder: "Enter Gst Number",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "business_ownership.type",
      label: "Business type",
      type: "text",
      placeholder: "Enter Business Type",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "state_name",
      label: "State",
      type: "text",
      placeholder: "Enter State",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "city_town",
      label: "City",
      type: "text",
      placeholder: "Enter City",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "address_line1",
      label: "Address line 1",
      type: "textarea",
      placeholder: "Enter Address",
      value: "",
    },
    {
      name: "address_line2",
      label: "Address Line 2",
      type: "textarea",
      placeholder: "Enter Address",
      value: "",
    },
    {
      name: "aadhar_image",
      label: "Aadhar Image",
      type: "file",
      placeholder: "Select Aadhar image",
      value: "",
      isSingle: true,
    },
    {
      name: "pan_image",
      label: "Pan Image",
      type: "file",
      placeholder: "Select Product video",
      value: "",
      isSingle: true,
    },
  ]);

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Shop Details", url: "/a/shops" },
        ]}
      />

      <div className="d-flex mt-3">
        <button
          className={`btn 
            ${tab === 0 ? "btn-dark" : "btn-outline-dark"}
            me-3`}
          onClick={() => {
            setTab(0);
          }}
        >
          Details
        </button>
        {/* <button
          className={`btn 
         ${tab === 1 ? "btn-dark" : "btn-outline-dark"}
          me-3`}
          onClick={() => {
            setTab(1);
          }}
        >
          Images
        </button> */}
        <div>
          <h3>Total Orders(9)</h3>
          <h3>Total Orders(0)</h3>
          <h3>Available Balance ₹0</h3>
        </div>
      </div>

      {tab === 0 && id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          redirectUrl="/a/products"
          api={{
            get: { method: "get", url: `/shop-details/get-all?id=${id}` },
            update: { method: "patch", url: `/products/${id}` },
          }}
        />
      )}
      {tab === 1 && <Images id={id} images={images} />}
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   const [data, filters, brands] = await Promise.all([
//     await axios.get(`https://admin.91pharma.in/api/v1/products/${id}`),
//     // await getOptions("filters?type=MEDICINE_HEALTH_CONCERN,MEDICINE_CATEGORY"),
//     // await getOptions("brands"),
//   ]);
//   // const defaultFilter
//   // let defaultFilter = data.data.filters.map((row) => {
//   //   return { value: row.id, label: row.name };
//   // })[0];
//   // let defaultBrand = data.data.brand;
//   // defaultBrand = { value: defaultBrand.uuid, label: defaultBrand.name };

//   return {
//     props: {
//       // filters,
//       // brands,
//       // defaultFilter,
//       // defaultBrand,
//       images: data,
//     },
//   };
// }

Shop.layout = "Admin";
export default Shop;
