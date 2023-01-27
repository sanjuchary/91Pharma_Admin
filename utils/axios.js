import axios from "axios";
import Router from "next/router";
import { getCookie } from "cookies-next";

const instance = axios.create();

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// add baseURL to axios
instance.defaults.baseURL = API_URL;

// Add a request interceptor
const token = getCookie("token", {
  decode: decodeURIComponent,
});

instance.interceptors.request.use(
  // add Authorization header
  (config) => {
    const token = getCookie("token", {
      decode: decodeURIComponent,
    });
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for unauthorized requests
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error?.response?.status === 401) {
      // Router.push("/a/logout");
    }
    return Promise.reject(error);
  }
);

export default instance;
