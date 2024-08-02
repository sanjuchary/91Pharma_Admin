import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SweetAlert from "../../../components/common/SweetAlert";
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
    {
      dataField: "category.name",
      text: "Parent",
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
          <Link href={`/a/subCategories/${item.id}`}>
            <a className="btn btn-dark btn-sm">View Details</a>
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
      text: "Add Sub-Category",
      url: "/a/subCategories/create",
      color: "dark",
      type: "button",
      size: "sm",
    },
  ];

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/sub-category/delete/${id}`, {
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
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Sub Categories", url: "/a/subCategories" },
        ]}
      />

      <Table
        columns={columns}
        url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/sub-category/get-all`}
        buttons={buttons}
        title="SubCategories"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
