import axios from "axios";

// const DEV_URL = process.env.REACT_APP_BASEURL_DEV;
const PROD_URL = process.env.REACT_APP_BASEURL_PROD;
const NETWORK_URL = "http://192.168.29.147:8080";

const BASEURL = process.env.NODE_ENV === "development" ? NETWORK_URL : PROD_URL;

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
    console.log(err);
    if ("data" in err.response) return Promise.reject(err.response.data);

    return Promise.reject(err.response);
  }
);

export default client;
