import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import axios from "axios";

const SubCategory = ({ categories, subCategoryData }) => {
  const router = useRouter();
  const { id } = router.query;

  console.log("log", subCategoryData.category.name);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const values = [
    {
      name: "name",
      label: "Sub-Category Name",
      type: "text",
      placeholder: "Enter Sub-Category name",
      value: subCategoryData?.name || "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "category_id",
      label: "Select Parent Category",
      type: "select",
      placeholder: "Select Category",
      defaultValue: "NO",
      value: "O",
      options: categories.data, // Use the processed category options
      isMulti: false,
      customClass: "col-md-3 col-12",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Upload category image",
      value: "",
      isSingle: true,
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Categories", url: "/a/subCategories" },
        ]}
      />
      {id && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: {
              method: "get",
              url: `/sub-category/get/by/${id}`,
            },
          }}
        />
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  const { id } = context.query;

  try {
    // Fetch all categories
    const categoriesResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}/category/get-all`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const categories = categoriesResponse.data?.data || [];

    // Fetch specific sub-category data
    const subCategoryResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_PROD_API_URL}/sub-category/get/by/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const subCategoryData = subCategoryResponse.data?.data;

    return {
      props: {
        categories,
        subCategoryData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        categories: [],
        subCategoryData: null,
      },
    };
  }
}

SubCategory.layout = "Admin";
export default SubCategory;
