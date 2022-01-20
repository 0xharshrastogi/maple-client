import axios from "axios";

const DEV_URL = process.env.REACT_APP_BASEURL_DEV;
const PROD_URL = process.env.REACT_APP_BASEURL_PROD;

const BASEURL = process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL;

const client = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 2000,
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err.response.data);
  }
);

export default client;
