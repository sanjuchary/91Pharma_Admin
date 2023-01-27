import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import { getOptions } from "../../../helpers/common/dropdownHelper";

const Test = ({ labs, tests, duration }) => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
      name: "lab_id",
      label: "Select Lab",
      type: "select",
      placeholder: "Select lab",
      defaultValue: "",
      value: "",
      options: labs,
      customClass: "col-12",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Enter Test image",
      value: "",
      isSingle: true,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      placeholder: "Enter Test content",
      value: "",
      customClass: "col-12",
    },
    {
      name: "preparation",
      label: "Preparation",
      type: "textarea",
      placeholder: "Enter Test preparation",
      value: "",
      customClass: "col-12",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter Test price",
      value: "",
      customClass: "col-12",
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
      placeholder: "Enter Test discount",
      value: "",
      customClass: "col-12",
    },
    {
      name: "report_tat",
      label: "Report Tat",
      type: "number",
      placeholder: "Enter Test report tat",
      value: "",
      customClass: "col-12",
    },
    {
      name: "report_tat_unit",
      label: "Report Tat Unit",
      type: "select",
      placeholder: "Enter Test report tat unit",
      value: "",
      customClass: "col-12",
      options: duration,
    },
    {
      name: "is_home_sample_available",
      label: "Is Home Sample Available",
      type: "checkbox",
      placeholder: "Enter Test is home sample available",
      value: "",
      customClass: "col-12",
    },
    {
      name: "home_sample_charge",
      label: "Home Sample Charge",
      type: "number",
      placeholder: "Enter Test home sample charge",
      value: "",
      customClass: "col-12",
    },
    {
      name: "is_lab_sample_available",
      label: "Is Lab Sample Available",
      type: "checkbox",
      placeholder: "Enter Test is lab sample available",
      value: "",
      customClass: "col-12",
    },
    {
      name: "is_package",
      label: "Is Package",
      type: "checkbox",
      placeholder: "Enter Test is package",
      value: "",
      customClass: "col-12",
    },
    {
      name: "child_test_ids",
      label: "Select Child Tests",
      type: "select",
      placeholder: "Select child tests",
      defaultValue: "",
      value: "",
      options: tests,
      isMulti: true,
      customClass: "col-12",
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Tests", url: "/a/tests" },
        ]}
      />
      <Form
        values={values}
        schema={schema}
        isMultiPart={true}
        redirectUrl="/a/tests"
        api={{
          update: { method: "post", url: `/lab/test` },
        }}
      />
    </div>
  );
};
export async function getServerSideProps(context) {
  const [labs, tests] = await Promise.all([
    await getOptions("lab"),
    await getOptions("lab/test?is_package=false"),
  ]);

  let duration = ["MINUTES", "HOURS", "DAYS", "WEEKS", "MONTHS"].map((row) => {
    return {
      value: row,
      label: row,
    };
  });
  return {
    props: {
      labs,
      tests,
      duration,
    },
  };
}
Test.layout = "Admin";
export default Test;
