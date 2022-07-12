import ApiInterface from "./interface";

class AuthApi extends ApiInterface {
  constructor() {
    super("auth");
  }

  async login(email, password) {
    await this.post({ email, password }, "login");
    return this.me();
  }

  async register(userData) {
    await this.post(userData, "signup");
    return this.me();
  }

  logout() {
    return this.get(null, "logout");
  }

  async me() {
    try {
      const me = await this.get(null, "me");
      return me;
    } catch (err) {
      return null;
    }
  }
}

export default AuthApi;
