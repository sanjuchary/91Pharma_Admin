import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_PROD_API_URL || "http://localhost:4000/api/v1";

const Index = () => {
  const columns = [
    { dataField: "serial_number", text: "S.N." },
    {
      dataField: "form_type",
      text: "Form Type",
    },
    // {
    //   dataField: "discount",
    //   text: "Discount",
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
      text: "Add Coupon",
      url: "/a/form-types/create",
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
          { text: "Form types", url: "/a/form-types" },
        ]}
      />

      <Table
        columns={columns}
        url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/form-type/get-all`}
        buttons={buttons}
        title="Form Types"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
