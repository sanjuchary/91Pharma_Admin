import axios from "axios";

const TableService = async (url, page, limit) => {
  return await axios
    .get(url, {
      params: {
        page: page,
        per_page: limit,
      },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
