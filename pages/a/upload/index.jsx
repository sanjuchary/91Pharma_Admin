import React, { useState, useRef } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import axios from "axios";
import SweetAlert from "../../../components/common/SweetAlert";
import Router from "next/router";

const Index = () => {
  const onRedirect = (url) => {
    Router.push(url);
  };

  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
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
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    // Clear the input field value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_PROD_API_URL}` + "/product/upload",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        handleSweetAlert(
          true,
          "Success",
          res?.data?.message || "Uploaded Successfully",
          "success"
        );
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
          if (sweetAlert.type === "success" && "/a/products") {
            onRedirect("/a/products");
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
          { text: "Upload", url: "/a/upload" },
        ]}
      />
      <div style={{ marginTop: "2rem" }}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          ref={fileInputRef} // Assign the ref to the input element
        />

        {file && (
          <button
            style={{
              backgroundColor: "#ff0000", // Red background color
              color: "#ffffff", // White text color
              borderRadius: "5px", // Rounded corners
              padding: "8px 16px", // Padding
              marginRight: "8px", // Right margin
              border: "none", // No border
              cursor: "pointer", // Cursor style
            }}
            onClick={handleRemoveFile}
          >
            Remove File
          </button>
        )}
        <button
          style={{
            backgroundColor: "#007bff", // Blue background color
            color: "#ffffff", // White text color
            borderRadius: "5px", // Rounded corners
            padding: "8px 16px", // Padding
            border: "none", // No border
            cursor: "pointer", // Cursor style
          }}
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

Index.layout = "Admin";
export default Index;
