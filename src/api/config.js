import axios from "axios";

function getBASEURL() {
  switch (process.env.NODE_ENV) {
    case "development":
      return process.env.REACT_APP_BASEURL_DEV;
    case "production":
      return process.env.REACT_APP_BASEURL_PROD;
  }
}

const BASEURL = getBASEURL();
console.log(BASEURL);

export default axios.create({ baseURL: BASEURL });
