import { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const columns = [
    {
      dataField: "serial_number",
      text: "S.N.",
    },

    { dataField: "first_name", text: "Name" },
    { dataField: "email", text: "email" },
    { dataField: "shopName", text: "Shop" },
    {
      dataField: "sanction_amount",
      text: "Credit Limit",
    },
    {
      dataField: "wallet_balance",
      text: "Wallet Balance",
    },
    {
      dataField: "due_amount",
      text: "Due Amount",
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
              pathname: "/a/credits/[id]",
              query: { id: item.id },
            }}
          >
            <a className="btn btn-dark btn-sm">View Details</a>
          </Link>
        </div>
      ),
    },
  ];

  const buttons = [
    {
      text: "Add credit",
      url: "/a/credits/create",
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
            { text: "Credits", url: "/a/credits" },
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
        url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/users/applyCreditedUsers`}
        buttons={buttons}
        title="Orders"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
