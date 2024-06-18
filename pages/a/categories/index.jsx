import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";
import SweetAlert from "../../../components/common/SweetAlert";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_PROD_API_URL || "https://admin.91pharma.in/api/v1";

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
      dataField: "uuid",
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
          <Link href={`/a/categories/${item.id}`}>
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
      text: "Add Category",
      url: "/a/categories/create",
      color: "dark",
      type: "button",
      size: "sm",
    },
  ];

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/category/delete/${id}`, {
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
          { text: "Categories", url: "/a/categories" },
        ]}
      />

      <Table
        columns={columns}
        url={`https://admin.91pharma.in/api/v1/category/get-all`}
        buttons={buttons}
        title="Categories"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
