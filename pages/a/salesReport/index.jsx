import React, { useState } from "react";
import Table from "../../../components/table/Index";
import Form from "../../../components/form/update";
import * as Yup from "yup";
import * as XLSX from "xlsx";
import axios from "axios";
import { saveAs } from "file-saver";

const Index = () => {
  const [loading, setLoading] = useState(false);

  const columns = [
    { dataField: "serial_number", text: "S.N." },
    { dataField: "uuid", text: "Shop ID" },
    { dataField: "user.store_detail", text: "Shop Name" },
    { dataField: "user.phone_number", text: "Phone Number" },
    { dataField: "shipping_address", text: "Address" },
    { dataField: "amount", text: "Amount" },
    { dataField: "createdAt", text: "Ordered Date" },
    { dataField: "delivery_date_time", text: "Delivered Date" },
    { dataField: "payment_method", text: "Payment Method" },
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

  const handleExport = async () => {
    setLoading(true);
    try {
      let apiUrl = "https://admin.91pharma.in/api/v1/order/salesReport";
      const fromDate = values.find((val) => val.name === "from").value;
      const toDate = values.find((val) => val.name === "to").value;

      if (fromDate && toDate) {
        apiUrl = `https://admin.91pharma.in/api/v1/order/salesReport?from_date=${fromDate}&to_date=${toDate}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        responseType: "blob",
      });

      const contentType = response.headers["content-type"];
      const contentDisposition = response.headers["content-disposition"];

      if (contentType && contentType.includes("application/json")) {
        // Handle JSON response if needed
        const json = await response.data.json();
        console.log("JSON Response:", json);
      } else {
        // Convert blob to CSV text
        const csvData = await new Response(response.data).text();

        // Save CSV file using file-saver
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "ordersReport.csv");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sales Report</h1>
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
            {loading ? "Exporting..." : "Export"}
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        url={`${process.env.NEXT_PUBLIC_PROD_API_URL}/order/salesReportView`}
        buttons={buttons1}
        title="Sales"
      />
    </div>
  );
};

Index.layout = "Admin";
export default Index;
