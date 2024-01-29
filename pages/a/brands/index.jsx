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
      dataField: "description",
      text: "Description",
    },
    // {
    //   dataField: "null",
    //   text: "Parent",
    //   type: "render",
    //   render: (item) => {
    //     if (item?.parent) {
    //       return (
    //         <Link href={`/a/brands/${item?.parent?.uuid}`}>
    //           <a className="text-dark">{item?.parent?.name}</a>
    //         </Link>
    //       );
    //     }
    //     return "";
    //   },
    // },
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
          <Link href={`/a/brands/${item.uuid}`}>
            <a className="btn btn-dark btn-sm">View Details</a>
          </Link>
        </div>
      ),
    },
  ];

  const buttons = [
    {
      text: "Add Brand",
      url: "/a/brands/create",
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
          { text: "Brands", url: "/a/brands" },
        ]}
      />

      <Table
        columns={columns}
        url="http://localhost:8000/api/v1/product/get-all"
        buttons={buttons}
        title="Brands"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
