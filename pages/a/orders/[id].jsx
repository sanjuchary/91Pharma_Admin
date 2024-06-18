import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import BreadCrumb from "../../../components/BreadCrumb";
import Form from "../../../components/form/update";

const API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;

const Order = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderData, setOrderData] = useState(null);

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
      value: orderData?.user_id || "",
      customClass: "col-3",
    },
    {
      name: "amount",
      label: "Amount_paid",
      type: "text",
      placeholder: "Enter amount",
      value: orderData?.amount || "",
      customClass: "col-3",
    },
    {
      name: "shipping_charge",
      label: "Shipping Charge",
      type: "text",
      placeholder: "Enter shipping charge",
      value: orderData?.shipping_charge || "",
      customClass: "col-3",
    },
    {
      name: "tax_percentage",
      label: "Tax Percentage",
      type: "text",
      placeholder: "Enter tax percentage",
      value: orderData?.tax_percentage || "",
      customClass: "col-3",
    },
    {
      name: "tax_amount",
      label: "Tax Amount",
      type: "text",
      placeholder: "Enter tax amount",
      value: orderData?.tax_amount || "",
      customClass: "col-3",
    },

    {
      name: "shipping_address",
      label: "Shipping Address",
      type: "text",
      placeholder: "Enter shipping address",
      value: orderData?.shipping_address || "",
      customClass: "col-3",
    },
    {
      name: "billing_address",
      label: "Billing Address",
      type: "text",
      placeholder: "Enter billing address",
      value: orderData?.billing_address || "",
      customClass: "col-3",
    },
    {
      name: "payment_method",
      label: "Payment Method",
      type: "text",
      placeholder: "Enter payment method",
      value: orderData?.payment_method || "",
      customClass: "col-3",
    },
    {
      name: "status",
      label: "Status",
      type: "text",
      placeholder: "Enter status",
      value: orderData?.status || "",
      customClass: "col-3",
    },
  ];

  useEffect(() => {
    if (id) {
      const fetchOrderData = async () => {
        try {
          const response = await fetch(`${API_URL}/order/all?id=${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          if (data.success) {
            setOrderData(data.data);
          } else {
            console.error("Failed to fetch order data");
          }
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      };
      fetchOrderData();
    }
  }, [id]);

  // Function to calculate subtotal for an order item
  const calculateSubtotal = (item) => {
    return item.product.price * item.quantity;
  };

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Orders", url: "/a/orders" },
        ]}
      />
      {orderData && (
        <>
          <Form
            values={values}
            schema={schema}
            isMultiPart={true}
            api={{
              get: { method: "get", url: `/order/all?id=${id}` },
              update: { method: "patch", url: `/orders/${id}` },
            }}
          />
          <div
            className="my-5 rounded p-4"
            style={{ width: "75vw", backgroundColor: "#DFE8EA" }}
          >
            <h3>Order Items</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Quantity</th>
                    <th>Discount(%)</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.order_items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.product.name}</td>
                      <td>{item.product.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.product.discount}%</td>
                      <td>{calculateSubtotal(item)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="5" className="text-end fw-bold">
                      Subtotal:
                    </td>
                    <td className="fw-bold">₹{orderData.amount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
Order.layout = "Admin";
export default Order;
