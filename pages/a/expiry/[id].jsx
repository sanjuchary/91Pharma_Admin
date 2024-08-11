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
      name: "form_type",
      label: "Product Name",
      type: "text",
      placeholder: "Enter Product Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "form_type",
      label: "Product ID",
      type: "text",
      placeholder: "Enter Product ID",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "form_type",
      label: "Shop Name",
      type: "text",
      placeholder: "Enter Shop Name",
      value: "",
      customClass: "col-md-3 col-12",
    },
    {
      name: "form_type",
      label: "Expiry Date",
      type: "text",
      placeholder: "Enter Expiry Date",
      value: "",
      customClass: "col-md-3 col-12",
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
            update: { method: "patch", url: `/coupons/${id}` },
          }}
        />
      )}
    </div>
  );
};
Coupon.layout = "Admin";
export default Coupon;
