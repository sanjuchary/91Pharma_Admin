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

const Product = ({ categories, brands, subCategories }) => {
  const router = useRouter();
  const { id } = router.query;

  // console.log("brandstest", brandstest);

  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState(0);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    context: Yup.string().required("Context is required"),
    price: Yup.number().required("Price is required"),
  });

  const values = [
    {
      name: "product_name",
      label: "Name",
      type: "text",
      placeholder: "Enter Product name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter Product description",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "product_id",
      label: "Product ID",
      type: "text",
      placeholder: "Enter Product ID",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "price",
      label: "Mrp Price",
      type: "number",
      placeholder: "Enter Product MRP",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "price",
      label: "PTR",
      type: "number",
      placeholder: "Enter Product PTR",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "price",
      label: "Net Price",
      type: "number",
      placeholder: "Enter Product Net Price",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
      placeholder: "Enter Product discount",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "igst",
      label: "IGST",
      type: "number",
      placeholder: "Enter Product IGST",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "context",
      label: "Context",
      type: "textarea",
      placeholder: "Enter Product context",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "hsn",
      label: "HSN",
      type: "text",
      placeholder: "Enter Product HSN",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Enter Product quantity",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "product_images",
      label: "Image",
      type: "file",
      placeholder: "Select Product image",
      value: "",
      isSingle: true,
    },
    {
      name: "brand_id",
      label: "Select Brand",
      type: "select",
      placeholder: "Select Brand",
      defaultValue: null,
      options: brands,
      isMulti: false,
    },
    {
      name: "category_id",
      label: "Select Category",
      type: "select",
      placeholder: "Select Category",
      defaultValue: null,
      value: "",
      options: categories,
      isMulti: false,
    },
    {
      name: "sub_category_id",
      label: "Select Sub Category",
      type: "select",
      placeholder: "Select Sub Category",
      defaultValue: null,
      options: subCategories,
      isMulti: false,
    },
    {
      name: "composition",
      label: "Composition",
      type: "text",
      placeholder: "Enter Product composition",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "packing_type",
      label: "Packing Type",
      type: "text",
      placeholder: "Enter Product Packing type",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "packing_size",
      label: "Packing Size",
      type: "text",
      placeholder: "Enter Product Packing Size",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "schedule",
      label: "Schedule",
      type: "text",
      placeholder: "Enter Product Schedule",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "usage",
      label: "Usage",
      type: "textarea",
      placeholder: "Enter Product usage",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "about_salt",
      label: "About Salt",
      type: "textarea",
      placeholder: "Enter Product about salt",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "mechanism_of_action",
      label: "Mechanism of Action",
      type: "textarea",
      placeholder: "Enter Product mechanism of action",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "pharmacokinets",
      label: "Pharmacokinets",
      type: "textarea",
      placeholder: "Enter Product pharmacokinets",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "onset_of_action",
      label: "Onset of Action",
      type: "textarea",
      placeholder: "Enter Product onset of action",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "duration_of_action",
      label: "Duration of Action",
      type: "textarea",
      placeholder: "Enter Product duration of action",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "half_life",
      label: "Half Life",
      type: "textarea",
      placeholder: "Enter Product half life",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "side_effects",
      label: "Side Effects",
      type: "textarea",
      placeholder: "Enter Product side effects",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "contra_indications",
      label: "Contra Indications",
      type: "textarea",
      placeholder: "Enter Product contra indications",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "special_precautions",
      label: "Special Precautions",
      type: "textarea",
      placeholder: "Enter Product special precautions",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "pregnancy_related_information",
      label: "Pregnancy Related Information",
      type: "textarea",
      placeholder: "Enter Product pregnancy related information",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "product_alchol_interaction",
      label: "Product Alchol Interaction",
      type: "textarea",
      placeholder: "Enter Product product alchol interaction",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "old_age_related_information",
      label: "Old Age Related Information",
      type: "textarea",
      placeholder: "Enter Product old age related information",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "breast_feeding_related_information",
      label: "Breast Feeding Related Information",
      type: "textarea",
      placeholder: "Enter Product breast feeding related information",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "child_related_information",
      label: "Child Related Information",
      type: "textarea",
      placeholder: "Enter Product child related information",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "indications",
      label: "Indications",
      type: "textarea",
      placeholder: "Enter Product indications",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "interactions",
      label: "Interactions",
      type: "textarea",
      placeholder: "Enter Product interactions",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "typical_dosage",
      label: "Typical Dosage",
      type: "textarea",
      placeholder: "Enter Product typical dosage",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "storage_requirements",
      label: "Storage Requirements",
      type: "textarea",
      placeholder: "Enter Product storage requirements",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "effects_mixed_dosage",
      label: "Effects Mixed Dosage",
      type: "textarea",
      placeholder: "Enter Product effects mixed dosage",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "effects_overdose",
      label: "Effects Overdose",
      type: "textarea",
      placeholder: "Enter Product effects overdose",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "expertise_advice",
      label: "Expertise Advice",
      type: "textarea",
      placeholder: "Enter Product expertise advice",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "how_to_use",
      label: "How to Use",
      type: "textarea",
      placeholder: "Enter Product how to use",
      customClass: "col-md-6 col-12",
      value: "",
    },
    {
      name: "faqs",
      label: "FAQs",
      type: "textarea",
      placeholder: "Enter Product faqs",
      customClass: "col-md-6 col-12",
      value: "",
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Products", url: "/a/products" },
        ]}
      />

      {/* <div className="d-flex mt-3">
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
        <button
          className={`btn 
         ${tab === 1 ? "btn-dark" : "btn-outline-dark"}
          me-3`}
          onClick={() => {
            setTab(1);
          }}
        >
          Images
        </button>
      </div> */}

      {/* {tab === 0 && id != undefined && ( */}
      <Form
        values={values}
        schema={schema}
        isMultiPart={true}
        api={{
          get: { method: "get", url: `/product/get-all?id=${id}` },
          // update: { method: "post", url: `/products/${id}` },
        }}
      />
      {/* )} */}
      {/* {tab === 1 && <Images id={id} images={images} />} */}
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   const [data, filters, brands] = await Promise.all([
//     await axios.get(`/products/${id}`),
//     await getOptions("filters?type=MEDICINE_HEALTH_CONCERN,MEDICINE_CATEGORY"),
//     await getOptions("brands"),
//   ]);
//   // const defaultFilter
//   let defaultFilter = data.data.filters.map((row) => {
//     return { value: row.id, label: row.name };
//   })[0];
//   let defaultBrand = data.data.brand;
//   defaultBrand = { value: defaultBrand.uuid, label: defaultBrand.name };

//   return {
//     props: {
//       filters,
//       brands,
//       defaultFilter,
//       defaultBrand,
//       images: data.data.images,
//     },
//   };
// }

export async function getServerSideProps({ params }) {
  const id = params.id;
  let filters = [];
  let brands = [];
  let defaultFilter = "";
  let defaultBrand = "";
  let images = [];

  try {
    // Fetch product details
    const response = await axios.get(
      `https://admin.91pharma.in/api/v1/product/get-all?id=${id}`
    );
    const product = response.data.data[0]; // Assuming response.data.data is an array and you need the first item
    defaultFilter = product.category_id || "";
    defaultBrand = product.brand_id || "";
    images = product.images || [];

    // Fetch categories options
    const categoriesResponse = await getOptions({
      endpoint: "https://admin.91pharma.in/api/v1/category/get-all",
      label: "category_name",
      val: "id",
    });
    filters = categoriesResponse;

    // Fetch brands options
    const brandsResponse = await axios.get(
      "https://admin.91pharma.in/api/v1/brand/get-all"
    );
    const brandsData = brandsResponse.data.data.data;
    // brandstest = brandsResponse;
    console.log("brands", brandsData);
    brands = brandsData.map((brand) => ({
      value: brand.id,
      label: brand.name,
      image: brand.document ? brand.document.url : null,
    }));
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  return {
    props: {
      filters,
      brands,
      // brandstest,
      defaultFilter,
      defaultBrand,
      images,
    },
  };
}

Product.layout = "Admin";
export default Product;
