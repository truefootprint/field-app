import { host } from "../../config/host.json";

const replaceLocalhost = (url) => {
  if (url.startsWith("http://localhost")) {
    return url.replace(/http:\/\/localhost:[\d]+/, host);
  } else {
    return url;
  }
};

export default replaceLocalhost;
