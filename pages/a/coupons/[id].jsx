import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Coupon = () => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
    discount: Yup.number().required("Discount is required"),
    min_value: Yup.number().required("Min Value is required"),
    max_value: Yup.number().required("Max Value is required"),
    max_amount: Yup.number().required("Max Amount is required"),
    expiry_date: Yup.date().required("Expiry Date is required"),
  });

  const values = [
    {
      name: "code",
      label: "Code",
      type: "text",
      placeholder: "Enter coupon Code",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
      placeholder: "Enter discount",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "min_value",
      label: "Min Value",
      type: "number",
      placeholder: "Enter min value",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "max_value",
      label: "Max Value",
      type: "number",
      placeholder: "Enter max value",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "max_amount",
      label: "Max Amount",
      type: "number",
      placeholder: "Enter max amount",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "expiry_date",
      label: "Expiry Date",
      type: "date",
      placeholder: "Enter expiry date",
      value: "",
      customClass: "col-md-6 col-12",
    },
    {
      name: "image",
      label: "Image",
      type: "file",
      placeholder: "Enter category image",
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
          { text: "Coupons", url: "/a/coupons" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/coupons/${id}` },
            // update: { method: "patch", url: `/coupons/${id}` },
          }}
        />
      )}
    </div>
  );
};
Coupon.layout = "Admin";
export default Coupon;
