import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";
import {
  getOptions,
  getDefaultValue,
} from "../../../helpers/common/dropdownHelper";
import axios from "../../../utils/axios";
const Test = ({ labs, tests, default_labs, defaultChildTests }) => {
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
      defaultValue: default_labs,
      value: "",
      options: labs,
      customClass: "col-12",
      isMulti: true,
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
      type: "text",
      placeholder: "Enter Test report tat unit",
      value: "",
      customClass: "col-12",
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
      defaultValue: defaultChildTests,
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
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/lab/test/${id}` },
            update: { method: "patch", url: `/lab/test/${id}` },
          }}
        />
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  const { id } = context.query;

  const [labs, tests] = await Promise.all([
    await getOptions("lab"),
    await getOptions("lab/test?is_package=false"),
  ]);
  //default value for child tests mutli select

  const lab_test = await axios.get(`/lab/test/${id}`).then((res) => {
    return res.data;
  });

  const package_tests = lab_test.tests?.map((item) => {
    return { value: item.uuid, label: item.name };
  });

  const default_labs = lab_test.labs?.map((item) => {
    return { value: item.uuid, label: item.name };
  });

  return {
    props: {
      labs,
      tests,
      default_labs,
      defaultChildTests: package_tests?.length > 0 ? package_tests : [],
    },
  };
}
Test.layout = "Admin";
export default Test;
