import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const columns = [
    { dataField: "serial_number", text: "S.N." },
    {
      dataField: "uuid",
      text: "Id",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "null",
      text: "Parent",
      type: "render",
      render: (item) => {
        if (item?.parent) {
          return (
            <Link href={`/a/categories/${item?.parent?.uuid}`}>
              <a className="text-dark">{item?.parent?.name}</a>
            </Link>
          );
        }
        return "";
      },
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
          <Link href={`/a/categories/${item.uuid}`}>
            <a className="btn btn-dark btn-sm">View Details</a>
          </Link>
        </div>
      ),
    },
  ];

  const buttons = [
    {
      text: "Add Category",
      url: "/a/categories/create",
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
          { text: "Categories", url: "/a/categories" },
        ]}
      />

      <Table
        columns={columns}
        url="/filters/table"
        buttons={buttons}
        title="Categories"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
