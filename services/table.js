import axios from "../utils/axios";

const TableService = (url, page, limit) => {
  return axios
    .get(url, {
      params: {
        page: page,
        limit: limit,
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
