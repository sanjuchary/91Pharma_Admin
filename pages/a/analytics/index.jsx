import Form from "../../../components/form/update";
import * as Yup from "yup";

const Index = () => {
  const schema = Yup.object().shape({
    from_date: Yup.date().required("From Date is required"),
    to_date: Yup.date().required("To Date is required"),
  });

  const values = [
    {
      name: "from",
      label: "From Date",
      type: "date",
      placeholder: "Enter from date",
      value: "",
      customClass: "col-2",
    },
    {
      name: "to",
      label: "To Date",
      type: "date",
      placeholder: "Enter to date",
      value: "",
      customClass: "col-2",
    },
  ];

  return (
    <div>
      <h1>Analytics</h1>
      <div className="mb-3">
        <Form
          values={values}
          schema={schema}
          isMultiPart={true}
          redirectUrl="/a/dashboard"
          formType="dashboard"
        />
      </div>
      <div
        className="d-flex flex-wrap align-items-center gap-3"
        style={{ width: "140vh" }}
      >
        <div
          className="border rounded p-2"
          style={{ width: "15vw", backgroundColor: "#0909" }}
        >
          <h2>12</h2>
          <a>Total Shops</a>
        </div>
        <div
          className="border rounded p-2"
          style={{ width: "15vw", backgroundColor: "#0909" }}
        >
          <h2>12</h2>
          <a>Total Products</a>
        </div>
        <div
          className="border rounded p-2"
          style={{ width: "15vw", backgroundColor: "#0909" }}
        >
          <h2>12</h2>
          <a>Total Orders</a>
        </div>
        <div
          className="border rounded p-2"
          style={{ width: "15vw", backgroundColor: "#0909" }}
        >
          <h2>12</h2>
          <a>Total Users</a>
        </div>
        <div
          className="border rounded p-2"
          style={{ width: "15vw", backgroundColor: "#0909" }}
        >
          <h2>12</h2>
          <a>Active Users</a>
        </div>
        <div
          className="border rounded p-2"
          style={{ width: "15vw", backgroundColor: "#0909" }}
        >
          <h2>12</h2>
          <a>Email Unverified Users</a>
        </div>
        <div
          className="border rounded p-2"
          style={{ width: "15vw", backgroundColor: "#0909" }}
        >
          <h2>12</h2>
          <a>Mobile Unverified Users</a>
        </div>
      </div>
    </div>
  );
};

Index.layout = "Admin";
export default Index;
