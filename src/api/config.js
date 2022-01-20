import axios from "axios";

const DEV_URL = process.env.REACT_APP_BASEURL_DEV;
const PROD_URL = process.env.REACT_APP_BASEURL_PROD;

function getBASEURL() {
  switch (process.env.NODE_ENV) {
    case "development":
      return DEV_URL;
    case "production":
      return PROD_URL;
  }
}

const BASEURL = getBASEURL();

export default axios.create({ baseURL: BASEURL });
