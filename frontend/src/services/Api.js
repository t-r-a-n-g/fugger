import axios from "axios";

export default {
  baseUrl: "http://localhost:5000/api",
  routes: {
    login: "auth/login",
    logout: "auth/logout",
    signup: "auth/signup",
    me: "auth/me",
  },

  get(url, params) {
    return axios.get(`${this.baseUrl}/${url}`, {
      params,
      withCredentials: true,
    });
  },

  post(url, body, params) {
    return axios.post(`${this.baseUrl}/${url}`, body, {
      params,
      withCredentials: true,
    });
  },

  async login(email, password) {
    await this.post(this.routes.login, { email, password });
    return this.getCurrentUser();
  },

  async signup(userData) {
    await this.post(this.routes.signup, userData);
    return this.getCurrentUser();
  },

  async logout() {
    return this.get(this.routes.logout);
  },

  async getCurrentUser() {
    try {
      const res = await this.get(this.routes.me);
      return res.data;
    } catch (res) {
      return null;
    }
  },
};
