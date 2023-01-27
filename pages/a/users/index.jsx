import BreadCrumb from "../../../components/BreadCrumb";
import Table from "../../../components/table/Index";
import Link from "next/link";

const Index = () => {
  const columns = [
    { dataField: "serial_number", text: "S.N." },
    //"first_name": "Sai",
    // "last_name": "Kiran",
    // "email": "saisk73@gmail.com",
    // "phone_ext": "+1",
    // "phone_number": "9123456789",
    // "status": "active",
    // "remember_token": "41365",
    // "address": {},
    {
      dataField: "first_name",
      text: "First Name",
    },
    {
      dataField: "last_name",
      text: "Last Name",
    },
    {
      dataField: "email",
      text: "Email",
    },

    {
      dataField: "status",
      text: "Status",
    },

    {
      dataField: null,
      text: "Actions",
      type: "render",
      render: (item) => (
        <div>
          <Link href={`/a/users/${item.uuid}`}>
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
          { text: "Users", url: "/a/users" },
        ]}
      />

      <Table columns={columns} url="/users/" buttons={buttons} title="Users" />
    </div>
  );
};
Index.layout = "Admin";
export default Index;
