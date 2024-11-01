import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

import chartData from "../../../utils/data.json";

const Index = () => {
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [dashboardData, setDashboardData] = useState({
    statusCounts: {},
    data: [],
    pagination: {},
  });
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("{{API_URL}}/order/dashboard");
      if (response.data.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
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
          style={{
            marginBottom: "20px",
            width: "30%",
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            gap: 20,
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              padding: "10px",
              width: 180, // Adjust width
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              padding: "10px",
              width: "100%", // Adjust width
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-3">
        {/* <div
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
        </div> */}
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
          <h3>{dashboardData?.statusCounts?.All_Orders || 0}</h3>
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
          <h3>{dashboardData?.statusCounts?.PENDING || 0}</h3>
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
          <h5>Total Confirmed Orders</h5>
          <h3>{dashboardData?.statusCounts?.CONFIRMED || 0}</h3>
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
          <h5>Total Processing Orders</h5>
          <h3>{dashboardData?.statusCounts?.PROCESSING || 0}</h3>
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
          <h5>Total Shipping Orders</h5>
          <h3>{dashboardData?.statusCounts?.SHIPPING || 0}</h3>
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
          <h5>Total Shipped Orders</h5>
          <h3>{dashboardData?.statusCounts?.SHIPPED || 0}</h3>
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
          <h5>Total Delivered Orders</h5>
          <h3>{dashboardData?.statusCounts?.DELIVERED || 0}</h3>
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
          <h3>{dashboardData?.statusCounts?.COMPLETED || 0}</h3>
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
          <h5>Total Cancelled Orders</h5>
          <h3>{dashboardData?.statusCounts?.CANCELLED || 0}</h3>
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
          <h5>Total Returned Orders</h5>
          <h3>{dashboardData?.statusCounts?.RETURNED || 0}</h3>
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
          <h5>Total Refunded Orders</h5>
          <h3>{dashboardData?.statusCounts?.REFUNDED || 0}</h3>
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
          <h5>Total Expired Orders</h5>
          <h3>{dashboardData?.statusCounts?.EXPIRED || 0}</h3>
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
