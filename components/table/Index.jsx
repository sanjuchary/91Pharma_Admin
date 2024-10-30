import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // For prop-types validation
import Link from "next/link";
import moment from "moment";
import { TableService } from "../../services/table";
import Pagination from "./Pagination";
import Limit from "./Limit";
import { useRouter } from "next/router";

const getNestedValue = (obj, path) => {
  return path?.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const Table = ({ url, columns, buttons, loadingMessage, errorMessage }) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [stats, setStats] = useState({
    total_rows: 0,
    total_pages: 0,
    current_page: 0,
  });

  const pathname = router.pathname;

  const handleData = async () => {
    setLoading(true);
    setError(null); // Reset error on new data fetch

    try {
      const res = await TableService(url, page, limit);
      let response = res.data;
      setStats({
        total_rows: response.total_rows,
        total_pages: response.total_pages,
        current_page: response.current_page,
      });
      setData(response?.data || []);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleValue = (item, column, index) => {
    const value = getNestedValue(item, column.dataField);

    if (column.type === "datetime") {
      return moment(value).locale("en-gb").format("D-MMM-YYYY");
    } else if (column.type === "render") {
      return column.render(item);
    } else if (column.dataField === "serial_number") {
      return index + 1;
    } else if (column.dataField === "is_active") {
      return value ? "Yes" : "No";
    } else if (column.dataField === "due_amount") {
      const sanctionAmount =
        parseFloat(getNestedValue(item, "sanction_amount")) || 0;
      const walletBalance =
        parseFloat(getNestedValue(item, "wallet_balance")) || 0;
      const dueAmount = sanctionAmount - walletBalance;
      return dueAmount.toFixed(2);
    }
    return value;
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleLimit = (limit) => {
    setLimit(limit);
  };

  useEffect(() => {
    handleData();
  }, [page, limit, url]); // Include URL in dependency array in case it changes

  if (loading) {
    return <p>{loadingMessage || "Loading..."}</p>;
  }

  if (error) {
    return <p>{errorMessage || error}</p>;
  }

  return (
    <div className="common__table mt-5">
      <div className="p-2">
        <div className="d-flex justify-content-between">
          <p className="fs-7">
            showing{" "}
            {pathname === "/a/categories" || pathname === "/a/brands"
              ? data?.data?.length
              : data?.length}{" "}
            out of {stats.total_rows || 0} rows ...
          </p>
          <div className="d-inline-flex">
            {buttons.map((button, key) => (
              <Link key={key} href={button.url}>
                <button
                  className={`btn btn-${button.color} btn-${button.size} px-3 me-2`}
                >
                  {button.text}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <div className="table-responsive mt-2">
          <table className="table table-borderless">
            <thead>
              <tr className="border-bottom">
                {columns.map((column, key) => (
                  <th className="fs-7" key={key}>
                    {column.text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pathname === "/a/categories" ||
              pathname === "/a/brands" ||
              pathname === "/a/subCategories" ||
              pathname === "/a/company"
                ? data?.data?.map((item, itemKey) => (
                    <tr className="border-bottom" key={itemKey}>
                      {columns.map((column, columnKey) => (
                        <td key={columnKey}>
                          {handleValue(item, column, itemKey)}
                        </td>
                      ))}
                    </tr>
                  ))
                : data?.map((item, itemKey) => (
                    <tr className="border-bottom" key={itemKey}>
                      {columns.map((column, columnKey) => (
                        <td key={columnKey}>
                          {handleValue(item, column, itemKey)}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          <Limit limit={limit} handleLimit={handleLimit} />
          <Pagination
            page={page}
            total_pages={stats.total_pages || 0}
            handlePage={handlePage}
          />
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  url: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataField: PropTypes.string,
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      render: PropTypes.func,
    })
  ).isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    })
  ),
  loadingMessage: PropTypes.string,
  errorMessage: PropTypes.string,
};

Table.defaultProps = {
  buttons: [],
};

export default Table;
