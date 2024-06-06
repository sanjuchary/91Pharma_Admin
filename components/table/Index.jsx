import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import moment from "moment";
import { useRouter } from "next/router";
import { TableService } from "../../services/table";
import Pagination from "./pagination";
import Limit from "./Limit";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

const Table = (props) => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [stats, setStats] = useState({
    total_rows: 0,
    total_pages: 0,
    current_page: 0,
  });

  const pathname = router.pathname;

  const handleData = () => {
    TableService(props.url, page, limit)
      .then((res) => {
        let response = res.data;
        setStats({
          total_rows: response.total_rows,
          total_pages: response.total_pages,
          current_page: response.current_page,
        });
        if (response?.message === "Applied Users For Credit Not Found") {
          return setData([]);
        }
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  const handleValue = (item, column, index) => {
    const value = getNestedValue(item, column.dataField);

    if (column.type === "datetime") {
      return moment(value).locale("en-gb").format("MMMM Do YYYY h:mm:ss a");
    } else if (column.type === "render") {
      return column.render(item);
    } else if (column.dataField === "serial_number") {
      return index + 1;
    } else if (column.dataField === "is_active") {
      // Handle boolean value display
      return value ? "Yes" : "No";
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
  }, [page, limit]);

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
            {props.buttons.map((button, key) => (
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
                {props.columns.map((column, key) => (
                  <th className="fs-7" key={key}>
                    {column.text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pathname === "/a/categories" ||
              pathname === "/a/brands" ||
              pathname === "/a/subCategories"
                ? data?.data?.map((item, itemKey) => (
                    <tr className="border-bottom" key={itemKey}>
                      {props.columns.map((column, columnKey) => (
                        <td key={columnKey}>
                          {handleValue(item, column, itemKey)}
                        </td>
                      ))}
                    </tr>
                  ))
                : data?.map((item, itemKey) => (
                    <tr className="border-bottom" key={itemKey}>
                      {props.columns.map((column, columnKey) => (
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

export default Table;
