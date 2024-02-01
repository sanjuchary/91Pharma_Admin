import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const columns = [
    { dataField: "serial_number", text: "S.N." },

    {
      dataField: "shop_name",
      text: "Shop Name",
    },
    {
      dataField: "aadhar_name",
      text: "Owner Name",
    },
    {
      dataField: "phone_number",
      text: "Mobile Number",
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
              pathname: "/a/shops/[id]",
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
      text: "",
      url: "/a/products/create",
    },
  ];

  return (
    <div>
      <BreadCrumb
        items={[
          { text: "Dashboard", url: "/a/dashboard" },
          { text: "Shop Details", url: "/a/shops" },
        ]}
      />
      <Table
        columns={columns}
        url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/shop-details/get-all`}
        buttons={buttons}
        title="Shops"
      />
    </div>
  );
};
Index.layout = "Admin";
export default Index;
