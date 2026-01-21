// src/services/loginService.js
import api from "./api";

const loginService = {
  async login(username, password) {
    const res = await api.post("/auth/login", { username, password });
    return res.data; // { token }
  },

  logout() {
    localStorage.removeItem("token");
  },
};

export default loginService;
