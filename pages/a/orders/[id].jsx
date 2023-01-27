import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const schema = Yup.object().shape({
    user_id: Yup.number().required("User ID is required"),
    amount: Yup.number().required("Amount is required"),
    shipping_charge: Yup.number().required("Shipping charge is required"),
    tax_percentage: Yup.number().required("Tax percentage is required"),
    tax_amount: Yup.number().required("Tax amount is required"),
    total_amount: Yup.number().required("Total amount is required"),
    shipping_address: Yup.string().required("Shipping address is required"),
    billing_address: Yup.string().required("Billing address is required"),
    payment_method: Yup.string().required("Payment method is required"),
    status: Yup.string().required("Status is required"),
  });

  const values = [
    {
      name: "user_id",
      label: "User ID",
      type: "text",
      placeholder: "Enter user id",
      value: "",
      customClass: "col-12",
    },
    {
      name: "amount",
      label: "Amount",
      type: "text",
      placeholder: "Enter amount",
      value: "",
      customClass: "col-12",
    },
    {
      name: "shipping_charge",
      label: "Shipping Charge",
      type: "text",
      placeholder: "Enter shipping charge",
      value: "",
      customClass: "col-12",
    },
    {
      name: "tax_percentage",
      label: "Tax Percentage",
      type: "text",
      placeholder: "Enter tax percentage",
      value: "",
      customClass: "col-12",
    },
    {
      name: "tax_amount",
      label: "Tax Amount",
      type: "text",
      placeholder: "Enter tax amount",
      value: "",
      customClass: "col-12",
    },
    {
      name: "total_amount",
      label: "Total Amount",
      type: "text",
      placeholder: "Enter total amount",
      value: "",
      customClass: "col-12",
    },
    {
      name: "shipping_address",
      label: "Shipping Address",
      type: "text",
      placeholder: "Enter shipping address",
      value: "",
      customClass: "col-12",
    },
    {
      name: "billing_address",
      label: "Billing Address",
      type: "text",
      placeholder: "Enter billing address",
      value: "",
      customClass: "col-12",
    },
    {
      name: "payment_method",
      label: "Payment Method",
      type: "text",
      placeholder: "Enter payment method",
      value: "",
      customClass: "col-12",
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      placeholder: "Enter status",
      value: "",
      customClass: "col-12",
    },
  ];

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Orders", url: "/a/orders" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/orders/${id}` },
            update: { method: "patch", url: `/orders/${id}` },
          }}
        />
      )}
    </div>
  );
};
Order.layout = "Admin";
export default Order;
