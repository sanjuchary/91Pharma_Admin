import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const columns = [
    {
      dataField: "serial_number",
      text: "S.N.",
    },

    { dataField: "first_name", text: "Name" },
    { dataField: "email", text: "Total Amount" },
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

  const buttons = [];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Orders", url: "/a/credits" },
        ]}
      />

      <Table
        columns={columns}
        url="http://localhost:8000/api/v1/users/applyCreditedUsers"
        buttons={buttons}
        title="Orders"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
