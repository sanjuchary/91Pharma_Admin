import { useState, useEffect } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_PROD_API_URL || "https://admin.91pharma.in/api/v1";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  // State to manage order status and table URL
  const [orderStatus, setOrderStatus] = useState("all");
  const [tableUrl, setTableUrl] = useState(`${API_URL}/order/all`);
  const [refreshKey, setRefreshKey] = useState(0);
  const [orderCounts, setOrderCounts] = useState({
    all: 0,
    placed: 0,
    confirmed: 0,
    processing: 0,
    shipped: 0,
    completed: 0,
    delivered: 0,
    cancel: 0,
    return: 0,
    refund: 0,
    inHouse: 0,
  });

  // Fetch order data and count orders by status
  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/order/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          const counts = {
            all: data.data.length,
            placed: 0,
            confirmed: 0,
            processing: 0,
            shipped: 0,
            completed: 0,
            delivered: 0,
            cancel: 0,
            return: 0,
            refund: 0,
            inHouse: 0,
          };

          data.data.forEach((order) => {
            switch (order.status.toUpperCase()) {
              case "PLACED":
                counts.placed++;
                break;
              case "CONFIRMED":
                counts.confirmed++;
                break;
              case "PROCESSING":
                counts.processing++;
                break;
              case "SHIPPED":
                counts.shipped++;
                break;
              case "COMPLETED":
                counts.completed++;
                break;
              case "DELIVERED":
                counts.delivered++;
                break;
              case "CANCELLED":
                counts.cancel++;
                break;
              case "RETURN":
                counts.return++;
                break;
              case "REFUND":
                counts.refund++;
                break;
              case "INHOUSE":
                counts.inHouse++;
                break;
              default:
                break;
            }
          });

          setOrderCounts(counts);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderCounts();
  }, []);

  // Effect to update the table URL based on the selected order status
  useEffect(() => {
    let url;
    switch (orderStatus) {
      case "placed":
        url = `${API_URL}/order/all?status=PLACED`;
        break;
      case "confirmed":
        url = `${API_URL}/order/all?status=CONFIRMED`;
        break;
      case "processing":
        url = `${API_URL}/order/all?status=PROCESSING`;
        break;
      case "shipped":
        url = `${API_URL}/order/all?status=SHIPPED`;
        break;
      case "completed":
        url = `${API_URL}/order/all?status=COMPLETED`;
        break;
      case "delivered":
        url = `${API_URL}/order/all?status=DELIVERED`;
        break;
      case "cancel":
        url = `${API_URL}/order/all?status=CANCELLED`;
        break;
      case "return":
        url = `${API_URL}/order/all?status=RETURN`;
        break;
      case "refund":
        url = `${API_URL}/order/all?status=REFUND`;
        break;
      case "inHouse":
        url = `${API_URL}/order/all?status=INHOUSE`;
        break;
      default:
        url = `${API_URL}/order/all`;
    }
    setTableUrl(url);
    // Increment refreshKey to trigger re-render of the Table component
    setRefreshKey((prevKey) => prevKey + 1);
  }, [orderStatus]);

  // Button data
  const buttons = [
    { text: `All Orders (${orderCounts.all})`, status: "all" },
    { text: `Placed Orders (${orderCounts.placed})`, status: "placed" },
    {
      text: `Confirmed Orders (${orderCounts.confirmed})`,
      status: "confirmed",
    },
    {
      text: `Processing Orders (${orderCounts.processing})`,
      status: "processing",
    },
    { text: `Shipped Orders (${orderCounts.shipped})`, status: "shipped" },
    {
      text: `Completed Orders (${orderCounts.completed})`,
      status: "completed",
    },
    {
      text: `Delivered Orders (${orderCounts.delivered})`,
      status: "delivered",
    },
    { text: `Cancelled Orders (${orderCounts.cancel})`, status: "cancel" },
    { text: `Returned Orders (${orderCounts.return})`, status: "return" },
    { text: `Refunded Orders (${orderCounts.refund})`, status: "refund" },
    { text: `InHouse Orders (${orderCounts.inHouse})`, status: "inHouse" },
  ];

  // Handle button click to set the order status
  const handleButtonClick = (status) => {
    setOrderStatus(status);
  };

  // Table columns definition
  const columns = [
    {
      dataField: "serial_number",
      text: "S.N.",
    },
    {
      dataField: "user.store_detail.shop_name",
      text: "Shop Name",
    },
    {
      dataField: "user.store_detail.phone_number",
      text: "Phone Number",
    },
    {
      dataField: "user.store_detail.city_town",
      text: "Address",
    },
    {
      dataField: "amount",
      text: "Amount",
    },
    {
      dataField: "createdAt",
      type: "datetime",
      value: "",
      text: "Ordered date",
    },
    {
      dataField: "Delivered date",
      text: "Delivered date",
    },
    {
      dataField: "payment_method",
      text: "Payment Method",
    },
    {
      dataField: "status",
      text: "Status",
    },
    {
      dataField: null,
      text: "Actions",
      type: "render",
      render: (item) => (
        <div>
          <Link href={`/a/orders/${item.uuid}`}>
            <a className="btn btn-dark btn-sm">View Details</a>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BreadCrumb
          items={[
            { text: "Dashboard", url: "/a/dashboard" },
            { text: "Orders", url: "/a/orders" },
          ]}
        />
        <div
          className="search-bar"
          style={{ marginBottom: "20px", width: "30%" }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "300px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>
      <div className="button-group">
        {buttons.map((button) => (
          <button
            key={button.status}
            className={`btn mx-3 mt-3 ${
              orderStatus === button.status ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => handleButtonClick(button.status)}
          >
            {button.text}
          </button>
        ))}
      </div>

      <Table
        key={refreshKey}
        columns={columns}
        url={tableUrl}
        buttons={[]}
        title="Orders"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
