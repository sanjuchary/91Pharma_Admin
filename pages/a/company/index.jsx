import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";
import SweetAlert from "../../../components/common/SweetAlert";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [url, setUrl] = useState(`${API_URL}/company/get-all`);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update the URL whenever the search term changes
  useEffect(() => {
    const searchQuery = searchTerm
      ? `?is_active=true&search=${searchTerm}`
      : "";
    setUrl(`${API_URL}/company/get-all${searchQuery}`);
  }, [searchTerm]);

  const columns = [
    { dataField: "serial_number", text: "S.N." },
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "name",
      text: "Name",
    },
    // {
    //   dataField: "null",
    //   text: "Parent",
    //   type: "render",
    //   render: (item) => {
    //     if (item?.parent) {
    //       return (
    //         <Link href={`/a/categories/${item?.parent?.uuid}`}>
    //           <a className="text-dark">{item?.parent?.name}</a>
    //         </Link>
    //       );
    //     }
    //     return "";
    //   },
    // },
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
          <Link href={`/a/company/${item.id}`}>
            <a className="btn btn-dark btn-sm">View Sub Categories</a>
          </Link>
          <Link href={`/a/company/${item.id}`}>
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
      text: "Add Company",
      url: "/a/company/create",
      color: "dark",
      type: "button",
      size: "sm",
    },
  ];

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/company/delete/${id}`, {
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
        console.log(res);
        setTimeout(() => {
          router.reload();
        }, 2000);
      })
      .catch((err) => {
        handleSweetAlert(true, "Error", err?.response?.data?.message, "error");
        console.log(err);
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
            { text: "Company", url: "/a/company" },
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
      <Table
        columns={columns}
        // url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/company/get-all`}
        url={url}
        buttons={buttons}
        title="Categories"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;