import axios from "../utils/axios";
import Router from "next/router";
import { getCookie, setCookies } from "cookies-next";

const loginService = async (data) => {
  return await axios
    .post("/auth/admin/login", data)
    .then((res) => {
      let response = res.data;
      let message = "";
      if (response.message) {
        message = response.message;
      }
      setCookies("token", response.token);
      setCookies("refresh_token", response.refresh_token);
      setCookies("user_name", response.userName);

      // get search params
      let searchParams = new URLSearchParams(window.location.search);
      let redirect = searchParams.get("redirect");
      let redirectTo = redirect ? redirect : "/a/dashboard";

      //set timeout for redirect
      setTimeout(() => {
        Router.push(redirectTo);
      }, 200);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  loginService,
};
