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

const Product = ({ filters, brands, defaultFilter, defaultBrand, images }) => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState(0);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    context: Yup.string().required("Context is required"),
    price: Yup.number().required("Price is required"),
  });

  const [values, setValues] = useState([
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Product name",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter Product description",
      value: "",
      customClass: "col-12",
    },
    {
      name: "product_id",
      label: "Association Product ID",
      type: "text",
      placeholder: "Enter Product ID",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "price",
      label: "Mrp Price",
      type: "number",
      placeholder: "Enter Product MRP",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "price",
      label: "PTR",
      type: "number",
      placeholder: "Enter Product PTR",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "price",
      label: "Net Price",
      type: "number",
      placeholder: "Enter Product Net Price",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
      placeholder: "Enter Product discount",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "igst",
      label: "IGST",
      type: "number",
      placeholder: "Enter Product IGST",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "context",
      label: "Context",
      type: "textarea",
      placeholder: "Enter Product context",
      value: "",
    },
    {
      name: "hsn",
      label: "HSN",
      type: "text",
      placeholder: "Enter Product HSN",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "Enter Product quantity",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Select Product image",
      value: "",
      isSingle: true,
    },
    {
      name: "video",
      label: "Video",
      type: "file",
      placeholder: "Select Product video",
      value: "",
      isSingle: true,
    },
    {
      name: "category_id",
      label: "Select Category",
      type: "select",
      placeholder: "Select Category",
      defaultValue: defaultFilter,
      value: "",
      options: filters,
    },
    {
      name: "brand_id",
      label: "Select Brand",
      type: "select",
      placeholder: "Select Brand",
      defaultValue: defaultBrand,
      options: brands,
    },
    {
      name: "usage",
      label: "Usage",
      type: "textarea",
      placeholder: "Enter Product usage",
      value: "",
    },
    {
      name: "about_salt",
      label: "About Salt",
      type: "textarea",
      placeholder: "Enter Product about salt",
      value: "",
    },
    {
      name: "mechanism_of_action",
      label: "Mechanism of Action",
      type: "textarea",
      placeholder: "Enter Product mechanism of action",
      value: "",
    },
    {
      name: "pharmacokinets",
      label: "Pharmacokinets",
      type: "textarea",
      placeholder: "Enter Product pharmacokinets",
      value: "",
    },
    {
      name: "onset_of_action",
      label: "Onset of Action",
      type: "textarea",
      placeholder: "Enter Product onset of action",
      value: "",
    },
    {
      name: "duration_of_action",
      label: "Duration of Action",
      type: "textarea",
      placeholder: "Enter Product duration of action",
      value: "",
    },
    {
      name: "half_life",
      label: "Half Life",
      type: "textarea",
      placeholder: "Enter Product half life",
      value: "",
    },
    {
      name: "side_effects",
      label: "Side Effects",
      type: "textarea",
      placeholder: "Enter Product side effects",
      value: "",
    },
    {
      name: "contra_indications",
      label: "Contra Indications",
      type: "textarea",
      placeholder: "Enter Product contra indications",
      value: "",
    },
    {
      name: "special_precautions",
      label: "Special Precautions",
      type: "textarea",
      placeholder: "Enter Product special precautions",
      value: "",
    },
    {
      name: "pregnancy_related_information",
      label: "Pregnancy Related Information",
      type: "textarea",
      placeholder: "Enter Product pregnancy related information",
      value: "",
    },
    {
      name: "product_alchol_interaction",
      label: "Product Alchol Interaction",
      type: "textarea",
      placeholder: "Enter Product product alchol interaction",
      value: "",
    },
    {
      name: "old_age_related_information",
      label: "Old Age Related Information",
      type: "textarea",
      placeholder: "Enter Product old age related information",
      value: "",
    },
    {
      name: "breast_feeding_related_information",
      label: "Breast Feeding Related Information",
      type: "textarea",
      placeholder: "Enter Product breast feeding related information",
      value: "",
    },
    {
      name: "child_related_information",
      label: "Child Related Information",
      type: "textarea",
      placeholder: "Enter Product child related information",
      value: "",
    },
    {
      name: "indications",
      label: "Indications",
      type: "textarea",
      placeholder: "Enter Product indications",
      value: "",
    },
    {
      name: "interactions",
      label: "Interactions",
      type: "textarea",
      placeholder: "Enter Product interactions",
      value: "",
    },
    {
      name: "typical_dosage",
      label: "Typical Dosage",
      type: "textarea",
      placeholder: "Enter Product typical dosage",
      value: "",
    },
    {
      name: "storage_requirements",
      label: "Storage Requirements",
      type: "textarea",
      placeholder: "Enter Product storage requirements",
      value: "",
    },
    {
      name: "effects_mixed_dosage",
      label: "Effects Mixed Dosage",
      type: "textarea",
      placeholder: "Enter Product effects mixed dosage",
      value: "",
    },
    {
      name: "effects_overdose",
      label: "Effects Overdose",
      type: "textarea",
      placeholder: "Enter Product effects overdose",
      value: "",
    },
    {
      name: "expertise_advice",
      label: "Expertise Advice",
      type: "textarea",
      placeholder: "Enter Product expertise advice",
      value: "",
    },
    {
      name: "how_to_use",
      label: "How to Use",
      type: "textarea",
      placeholder: "Enter Product how to use",
      value: "",
    },
    {
      name: "faqs",
      label: "FAQs",
      type: "textarea",
      placeholder: "Enter Product faqs",
      value: "",
    },
  ]);

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Products", url: "/a/products" },
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
      </div>

      {tab === 0 && id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          redirectUrl="/a/products"
          api={{
            get: { method: "get", url: `/product/get-all?id=${id}` },
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

Product.layout = "Admin";
export default Product;
