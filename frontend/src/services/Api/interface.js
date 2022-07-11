import axios from "axios";

class ApiInterface {
  constructor(route) {
    this.baseUrl = "http://localhost:5000/api";
    this.route = route;

    this.headers = {};
  }

  request(method, url, { body, query, headers }) {
    const config = {
      method,
      url,
      withCredentials: true,
      headers: this.headers,
    };

    if (body) config.data = body;
    if (query) config.params = query;
    if (headers) config.headers = { ...config.headers, headers };

    return axios(config);
  }

  composeUrl(url = null) {
    let reqUrl = `${this.baseUrl}/${this.route}`;
    if (url) reqUrl = `${reqUrl}/${url}`;
    return reqUrl;
  }

  get(query = null, url = null) {
    return this.request("get", this.composeUrl(url), { query });
  }

  post(body, url = null, query = null) {
    return this.request("post", this.composeUrl(url), { body, query });
  }

  put(body, url = null, query = null) {
    return this.request("put", this.composeUrl(url), { body, query });
  }
}

export default ApiInterface;
