import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      <div className="d-flex align-items-center gap-3">
        <div className="bg-light rounded justify-content-center">
          <Link href={`/a/ordersReport`}>
            <h1
              className="btn p-3 "
              style={{ backgroundColor: "#007bff", color: "#ffffff" }}
            >
              Orders Report
            </h1>
          </Link>
        </div>

        <div className=" rounded justify-content-center">
          <Link href={`/a/salesReport`}>
            <h1
              className="btn p-3"
              style={{ backgroundColor: "#007bff", color: "#ffffff" }}
            >
              Sales Report
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

Index.layout = "Admin";
export default Index;
