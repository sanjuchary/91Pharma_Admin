import React, { useMemo, useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const url =
  `${process.env.NEXT_PUBLIC_PROD_API_URL}/banner/get/` ||
  "https://admin.91pharma.in/api/v1/banner/get/";

const Index = () => {
  const renderImage = (item) => {
    const document = item.documents && item.documents[0];
    return document ? (
      <div>
        <img
          src={document.url}
          alt={document.name}
          style={{ width: "100px", display: "block" }}
        />
        <span>{document.name}</span>
      </div>
    ) : (
      "No Image"
    );
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = useMemo(
    () => [
      { dataField: "serial_number", text: "S.N." },
      {
        dataField: "screen_name",
        text: "Name",
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
                pathname: "/a/banners/[id]",
                query: { id: item.id, name: item.screen_name },
              }}
            >
              <a className="btn btn-dark btn-sm">View Details</a>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const buttons = useMemo(
    () => [
      {
        text: "Add banners",
        url: "/a/banners/create",
        color: "dark",
        type: "button",
        size: "sm",
      },
    ],
    []
  );

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
            { text: "Banners", url: "/a/banners" },
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
      <Table columns={columns} url={url} buttons={buttons} title="Banners" />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
