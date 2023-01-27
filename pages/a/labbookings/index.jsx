import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const columns = [
    {
      dataField: "serial_number",
      text: "S.N.",
    },

    { dataField: "lab_order_id", text: "Order ID" },
    { dataField: "total_amount", text: "Total Amount" },
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
          <Link href={`/a/labbookings/${item.uuid}`}>
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
          { text: "Lab Bookings", url: "/a/labbookings" },
        ]}
      />

      <Table
        columns={columns}
        url="/orders/laborders/admin"
        buttons={buttons}
        title="Lab Bookings"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
