import axios from "axios";
import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SweetAlert from "../../../components/common/SweetAlert";

const API_URL =
  process.env.NEXT_PUBLIC_PROD_API_URL || "http://localhost:4000/api/v1";

const Index = () => {
  const router = useRouter();
  const [sweetAlert, setSweetAlert] = useState({
    show: false,
    title: "",
    text: "",
    type: "default",
  });

  const handleSweetAlert = (show, title, text, type) => {
    setSweetAlert({
      show: show || false,
      title: title || sweetAlert.title,
      text: text || sweetAlert.text,
      type: type || sweetAlert.type,
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [url, setUrl] = useState(
    `${API_URL}/product/get-all?search=${searchTerm}`
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update the URL whenever the search term changes
  useEffect(() => {
    console.log("search", searchTerm);
    setUrl(`${API_URL}/product/get-all?search=${searchTerm}`);
  }, [searchTerm]);

  const columns = [
    { dataField: "serial_number", text: "S.N." },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "brand_id",
      text: "Brand ID",
    },
    {
      dataField: "category_id",
      text: "Category ID",
    },
    {
      dataField: "sub_category_id",
      text: "Sub-Category ID",
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
    // {
    //   dataField: null,
    //   text: "Actions",
    //   type: "render",
    //   render: (item) => (
    //     <div>
    //       <Link href={`/a/products/${item.id}`}>
    //         <a className="btn btn-dark btn-sm">View Details</a>
    //       </Link>
    //       <a
    //         className="btn btn-dark btn-sm"
    //         style={{ marginLeft: "10px" }}
    //         onClick={() => handleDelete(item.id)}
    //       >
    //         Delete
    //       </a>
    //     </div>
    //   ),
    // },
    {
      dataField: null,
      text: "Actions",
      type: "render",
      render: (item) => (
        <div>
          {/* <Link href={`/a/categories/${item.id}`}>
            <a className="btn btn-dark btn-sm">View Sub Categories</a>
          </Link> */}
          <Link href={`/a/products/${item.id}`}>
            <a className="btn btn-dark btn-sm" style={{ marginLeft: "10px" }}>
              View Details
            </a>
          </Link>
          <a
            className="btn btn-dark btn-sm"
            style={{ marginLeft: "10px" }}
            onClick={() => handleDelete(item.id)}
            // onClick={console.log("id", item.id)}
          >
            Delete
          </a>
        </div>
      ),
    },
  ];

  const buttons = [
    {
      text: "Add Product",
      url: "/a/products/create",
      color: "dark",
      type: "button",
      size: "sm",
    },
  ];

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/product/delete/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        handleSweetAlert(
          true,
          "Success",
          res?.data?.message || "Deleted Successfully",
          "success"
        );
        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch((err) => {
        handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
      });
  };

  return (
    <div>
      <SweetAlert
        show={sweetAlert.show}
        title={sweetAlert.title}
        text={sweetAlert.text}
        type={sweetAlert.type}
        onConfirm={() => {
          if (sweetAlert.type === "success" && props.redirectUrl) {
            onRedirect(props.redirectUrl);
          } else if (sweetAlert.type === "success") {
            getData();
            handleSweetAlert(false);
          } else {
            handleSweetAlert(false);
          }
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
            { text: "Products", url: "/a/products" },
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
      <Table columns={columns} url={url} buttons={buttons} title="Products" />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
