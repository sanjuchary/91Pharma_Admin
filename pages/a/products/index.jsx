import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const columns = [
    { dataField: "serial_number", text: "S.N." },

    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "brand_id",
      text: "Brand ID",
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
              pathname: "/a/products/[id]",
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
      text: "Add Product",
      url: "/a/products/create",
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
          { text: "Products", url: "/a/products" },
        ]}
      />
      <Table
        columns={columns}
        url="http://localhost:4000/api/v1/product/get-all"
        buttons={buttons}
        title="Products"
      />
    </div>
  );
};
Index.layout = "Admin";
export default Index;
