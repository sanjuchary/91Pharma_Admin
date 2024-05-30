import React from "react";
import Table from "../../../components/table/Index";
import Form from "../../../components/form/update";
import * as Yup from "yup";
import * as XLSX from "xlsx";

const Index = () => {
  const columns = [
    { dataField: "serial_number", text: "S.N." },
    { dataField: "Shop_id", text: "Shop ID" },
    { dataField: "Shop_Name", text: "Shop Name" },
    { dataField: "Phone_Number", text: "Phone Number" },
    { dataField: "Address", text: "Address" },
    { dataField: "amount", text: "Amount" },
    { dataField: "Ordered_date", text: "Ordered Date" },
    { dataField: "Delivered_date", text: "Delivered Date" },
    { dataField: "Payment_Method", text: "Payment Method" },
    { dataField: "status", text: "Status" },
  ];

  const buttons1 = [];

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
      customClass: "col-6",
    },
    {
      name: "to",
      label: "To Date",
      type: "date",
      placeholder: "Enter to date",
      value: "",
      customClass: "col-6",
    },
  ];

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData); // Process imported data
    };
    input.click();
  };

  const handleExport = () => {
    const tableData = [
      // Mock data for example
      {
        serial_number: 1,
        Shop_id: "001",
        Shop_Name: "Shop 1",
        Phone_Number: "1234567890",
        Address: "Address 1",
        amount: 100,
        Ordered_date: "2023-05-01",
        Delivered_date: "2023-05-05",
        Payment_Method: "Credit Card",
        status: "Delivered",
      },
      // Add more data as needed
    ];

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(workbook, "OrdersReport.xlsx");
  };

  return (
    <div>
      <h1>Orders Report</h1>
      <div className="d-flex gap-2 align-items-center">
        <div>
          <Form
            values={values}
            schema={schema}
            isMultiPart={true}
            redirectUrl="/a/dashboard"
            formType="dashboard"
          />
        </div>
        <div className="d-flex gap-2 mx-5 mb-3">
          <button
            className="btn btn-primary"
            style={{ width: "150px", height: "40px" }}
            onClick={handleImport}
          >
            Import
          </button>
          <button
            className="btn btn-secondary"
            style={{ width: "150px", height: "40px" }}
            onClick={handleExport}
          >
            Export
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/order/all`}
        buttons={buttons1}
        title="Orders"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
