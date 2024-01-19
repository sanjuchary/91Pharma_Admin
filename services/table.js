import axios from "axios";

const TableService = (url, page, limit) => {
  return axios
    .get(url, {
      params: {
        page: page,
        limit: limit,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  TableService,
};
