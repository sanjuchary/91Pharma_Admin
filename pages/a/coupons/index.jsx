import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const columns = [
    { dataField: "serial_number", text: "S.N." },
    {
      dataField: "code",
      text: "Code",
    },
    {
      dataField: "discount",
      text: "Discount(%)",
    },
    {
      dataField: "expiry_date",
      text: "Validity",
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
          <Link href={`/a/coupons/${item.uuid}`}>
            <a className="btn btn-dark btn-sm">View Details</a>
          </Link>
        </div>
      ),
    },
  ];

  const buttons = [
    {
      text: "Add Coupon",
      url: "/a/coupon/add",
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
          { text: "Coupons", url: "/a/coupon/all" },
        ]}
      />

      <Table
        columns={columns}
        url="http://localhost:8000/api/v1/coupon/all"
        buttons={buttons}
        title="Coupons"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
