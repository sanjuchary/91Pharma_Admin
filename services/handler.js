import axios from "../utils/axios";

const UpdateService = (url, data) => {
  return axios
    .patch(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  UpdateService,
};
