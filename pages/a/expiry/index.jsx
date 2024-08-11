import { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_PROD_API_URL || "http://localhost:4000/api/v1";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    { dataField: "serial_number", text: "S.N." },
    {
      dataField: "name",
      text: "Product Name",
    },
    {
      dataField: "name",
      text: "Product ID",
    },
    {
      dataField: "discount",
      text: "Shop Name",
    },
    {
      dataField: "createdAt",
      text: "Expiry Date",
      type: "datetime",
    },
    // {
    //   dataField: null,
    //   text: "Actions",
    //   type: "render",
    //   render: (item) => (
    //     <div>
    //       <Link href={`/a/form-types/${item.uuid}`}>
    //         <a className="btn btn-dark btn-sm">View Details</a>
    //       </Link>
    //     </div>
    //   ),
    // },
  ];

  const buttons = [
    {
      text: "Add Expiry",
      url: "/a/expiry/create",
      color: "dark",
      type: "button",
      size: "sm",
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
            { text: "Expiry List", url: "/a/expiry" },
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
        url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/expiry/get-all`}
        buttons={buttons}
        title="Expiry"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
