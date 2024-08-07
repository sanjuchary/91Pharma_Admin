import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";
import axios from "axios";
import SweetAlert from "../../../components/common/SweetAlert";
import { useRouter } from "next/router";

const Index = () => {
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const [url, setUrl] = useState(
    `${process.env.NEXT_PUBLIC_PROD_API_URL}/shop-details/get-all`
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
      formatter: (cell) => {
        return cell ? "Yes" : "No";
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
          {item.is_active ? (
            <a
              className="btn btn-dark btn-sm"
              style={{ marginLeft: "10px" }}
              onClick={() => handleInactive(item.id)}
            >
              Inactive
            </a>
          ) : (
            <a
              className="btn btn-dark btn-sm"
              style={{ marginLeft: "10px" }}
              onClick={() => handleApprove(item.id)}
            >
              Approve
            </a>
          )}
          {!item.is_active && (
            <a
              className="btn btn-dark btn-sm"
              style={{ marginLeft: "10px" }}
              onClick={() => handleDeny(item.uuid)}
            >
              Deny
            </a>
          )}
        </div>
      ),
    },
  ];

  const [sweetAlert, setSweetAlert] = useState({
    show: false,
    title: "",
    text: "",
    type: "default",
  });

  const handleSweetAlert = (show, title = "", text = "", type = "") => {
    setSweetAlert({ show, title, text, type });
  };

  const handleApprove = (uuid) => {
    axios
      .post(
        `https://admin.91pharma.in/api/v1/shop-details/activate`,
        { shop_ids: [uuid] },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setSweetAlert({
          show: true,
          title: "Shop Activated",
          text: "The shop has been successfully activated!",
          type: "success",
        });
      })
      .catch((error) => {
        setSweetAlert({
          show: true,
          title: "Activation Failed",
          text: "There was an error activating the shop. Please try again.",
          type: "danger",
        });
      });
  };

  const handleInactive = (uuid) => {
    axios
      .post(
        `https://admin.91pharma.in/api/v1/shop-details/deactivate`,
        { shop_ids: [uuid] },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setSweetAlert({
          show: true,
          title: "Shop Deactivated",
          text: "The shop has been successfully deactivated!",
          type: "success",
        });
      })
      .catch((error) => {
        setSweetAlert({
          show: true,
          title: "Deactivation Failed",
          text: "There was an error deactivating the shop. Please try again.",
          type: "danger",
        });
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
      <SweetAlert
        show={sweetAlert.show}
        title={sweetAlert.title}
        text={sweetAlert.text}
        type={sweetAlert.type}
        onConfirm={() => {
          handleSweetAlert(false);
        }}
        onCancel={() => {
          handleSweetAlert(false);
        }}
      />
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
            { text: "Shop Details", url: "/a/shops" },
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
