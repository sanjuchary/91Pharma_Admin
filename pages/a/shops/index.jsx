import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";
import axios from "axios";

const Index = () => {
  const [filter, setFilter] = useState("all");
  const [url, setUrl] = useState(
    `${process.env.NEXT_PUBLIC_PROD_API_URL}/shop-details/get-all`
  );

  const columns = [
    { dataField: "serial_number", text: "S.N." },

    {
      dataField: "shop_name",
      text: "Shop Name",
    },
    {
      dataField: "aadhar_name",
      text: "Owner Name",
    },
    {
      dataField: "phone_number",
      text: "Mobile Number",
    },
    {
      dataField: "is_active",
      text: "Is Active",
      formatter: (cell, row) => {
        console.log("Formatter cell:", cell); // Check the value of cell
        return cell ? "Yes" : "No"; // Convert boolean to "Yes" or "No"
      },
    },
    {
      dataField: "createdAt",
      text: "Created At",
      type: "datetime",
    },
    {
      dataField: "updatedAt",
      text: "Updated At",
      type: "datetime",
    },
    {
      dataField: null,
      text: "Actions",
      type: "render",
      render: (item) => (
        <div>
          <Link
            href={{
              pathname: "/a/shops/[id]",
              query: { id: item.id },
            }}
          >
            <a className="btn btn-dark btn-sm">View Details</a>
          </Link>
          <a
            className="btn btn-dark btn-sm"
            style={{ marginLeft: "10px" }}
            onClick={() => handleApprove(item.id)}
          >
            Approve
          </a>
          <a
            className="btn btn-dark btn-sm"
            style={{ marginLeft: "10px" }}
            onClick={() => handleDeny(item.uuid)}
          >
            Deny
          </a>
        </div>
      ),
    },
  ];

  const handleApprove = (uuid) => {
    console.log("Approve clicked for:", uuid);
    axios
      .post(
        `http://localhost:4000/api/v1/shop-details/activate`,
        {
          shop_ids: [uuid],
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Activation response:", response.data);
        // Optionally update your UI or state based on response
        // For example, refresh data after approval
      })
      .catch((error) => {
        console.error("Error activating shop:", error);
        // Handle errors appropriately
      });
  };

  const buttons = [
    {
      text: "",
      url: "/a/products/create",
    },
  ];

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    let newUrl = `${process.env.NEXT_PUBLIC_PROD_API_URL}/shop-details/get-all`;
    if (value === "approved") {
      newUrl += "?status=approved";
    } else if (value === "pending") {
      newUrl += "?status=pending";
    }
    setUrl(newUrl);
  };

  useEffect(() => {
    let newUrl = `${process.env.NEXT_PUBLIC_PROD_API_URL}/shop-details/get-all`;
    if (filter === "approved") {
      newUrl += "?status=approved";
    } else if (filter === "pending") {
      newUrl += "?status=pending";
    }
    setUrl(newUrl);
  }, [filter]);

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Shop Details", url: "/a/shops" },
        ]}
      />

      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <label
          htmlFor="statusFilter"
          style={{
            marginLeft: "10px",
            marginRight: "20px",
            fontWeight: "bold",
          }}
        >
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={handleFilterChange}
          style={{ padding: "5px", fontSize: "1rem" }}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <Table columns={columns} url={url} buttons={buttons} title="Shops" />
    </div>
  );
};
Index.layout = "Admin";
export default Index;
