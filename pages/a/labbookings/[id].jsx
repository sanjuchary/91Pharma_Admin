import { useRouter } from "next/router";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const LabOrder = () => {
  const router = useRouter();
  const { id } = router.query;
  //"id": 1,
  //     "uuid": "9af6cfff-e30b-4131-9b15-a2af38bd4147",
  //     "lab_order_id": "9146970803",
  //     "amount": "9.20",
  //     "shipping_charge": "1.00",
  //     "discount": 0,
  //     "tax_percentage": 10,
  //     "tax_amount": "1.00",
  //     "total_amount": "9.20",
  //     "payment_method": "COD",
  //     "transaction_id": null,
  //     "shipping_address": "{}",
  //     "billing_address": "{}",
  //     "status": "COMPLETED",
  //     "user_id": 1,

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
      name: "payment_method",
      label: "Payment Method",
      type: "text",
      placeholder: "Enter payment method",
      value: "",
      customClass: "col-12",
    },
    {
      name: "transaction_id",
      label: "Transaction ID",
      type: "text",
      placeholder: "Enter transaction id",
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
      name: "status",
      label: "Status",
      type: "text",
      placeholder: "Enter status",
      value: "",
      customClass: "col-12",
    },
  ];

  const schema = Yup.object().shape({
    user_id: Yup.string().required("User ID is required"),
  });

  return (
    //react hook form
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Lab Bookings", url: "/a/labbookings" },
        ]}
      />
      {id != undefined && (
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          api={{
            get: { method: "get", url: `/orders/laborders/${id}` },
            update: { method: "patch", url: `/orders/laborders/${id}` },
          }}
        />
      )}
    </div>
  );
};
LabOrder.layout = "Admin";
export default LabOrder;
