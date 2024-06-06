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
    { dataField: "email", text: "email" },
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
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Credits", url: "/a/credits" },
        ]}
      />

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
