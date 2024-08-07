import React, { useState } from "react";
import Link from "next/link";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

import chartData from "../../../utils/data.json";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Dashboard</h1>
        <div
          className="search-bar"
          style={{ marginBottom: "20px", width: "30%" }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: "10px",
              width: "100%",
              maxWidth: "300px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-3">
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Total Sellers</h5>
          <h3>12</h3>
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Total Orders</h5>
          <h3>12</h3>
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Total Pending Orders</h5>
          <h3>12</h3>
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Total Completed Orders</h5>
          <h3>12</h3>
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Total Sales</h5>
          <h3>12</h3>
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Total Revenue</h5>
          <h3>12</h3>
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Active Customers</h5>
          <h3>12</h3>
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            flex: "1 1 calc(25% - 1rem)",
            boxSizing: "border-box",
          }}
        >
          <h5>Total Subscribers</h5>
          <h3>12</h3>
        </div>

        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            width: "24%",

            boxSizing: "border-box",
          }}
        >
          <h3>Product</h3>
          <Doughnut
            data={{
              labels: chartData.map((data) => `${data.label}: ${data.value}`),
              datasets: [
                {
                  label: "Revenue",
                  data: chartData.map((data) => data.value),
                },
              ],
            }}
          />
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            width: "24%",
            boxSizing: "border-box",
          }}
        >
          <h3>Orders Summary</h3>
          <Doughnut
            data={{
              labels: chartData.map((data) => `${data.label}: ${data.value}`),
              datasets: [
                {
                  label: "Revenue",
                  data: chartData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43 ,73, 229,0.8)",
                    "rgba(250 ,192, 19,0.8)",
                    "rgba(223 ,135, 135,0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            width: "24%",
            boxSizing: "border-box",
          }}
        >
          <h3>Sellers</h3>
          <Doughnut
            data={{
              labels: chartData.map((data) => `${data.label}: ${data.value}`),
              datasets: [
                {
                  label: "Revenue",
                  data: chartData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43 ,73, 229,0.8)",
                    "rgba(250 ,192, 19,0.8)",
                    "rgba(223 ,135, 135,0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            width: "23%",
            boxSizing: "border-box",
          }}
        >
          <h3>Guest/Authorized Order Today</h3>
          <Doughnut
            data={{
              labels: chartData.map((data) => `${data.label}: ${data.value}`),
              datasets: [
                {
                  label: "Revenue",
                  data: chartData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43 ,73, 229,0.8)",
                    "rgba(250 ,192, 19,0.8)",
                    "rgba(223 ,135, 135,0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
        <div
          className="bg-light rounded justify-content-center"
          style={{
            color: "#000",
            padding: 20,
            width: "24%",
            boxSizing: "border-box",
          }}
        >
          <h3>Today Order summary</h3>
          <Doughnut
            data={{
              labels: chartData.map((data) => `${data.label}: ${data.value}`),
              datasets: [
                {
                  label: "Revenue",
                  data: chartData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43 ,73, 229,0.8)",
                    "rgba(250 ,192, 19,0.8)",
                    "rgba(223 ,135, 135,0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-3 mt-4">
        <div
          className="card"
          style={{
            width: "48%",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <h3>Top 10 Products</h3>
          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.label}</td>
                  <td>{product.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="card"
          style={{
            width: "48%",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <h3>Top 10 Sellers</h3>
          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Shop</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.label}</td>
                  <td>{product.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Index.layout = "Admin";
export default Index;
