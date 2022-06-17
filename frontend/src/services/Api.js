import axios from "axios";

export default {
  baseUrl: "http://localhost:5000/api",

  get(url, params) {
    return axios.get(`${this.baseUrl}/${url}`, { params });
  },
};
