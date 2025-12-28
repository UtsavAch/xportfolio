// src/services/loginService.js
import api from "./api";

const loginService = {
  async login(username, password) {
    try {
      const res = await api.post("/auth/login", { username, password });

      const token = res.data.token;
      localStorage.setItem("token", token);

      return { success: true, token };
    } catch (error) {
      return { success: false, message: "Invalid credentials" };
    }
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};

export default loginService;
