import { createContext, useContext, useState } from "react";
import loginService from "../management/services/loginService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const isLoggedIn = !!token;

  const login = async (username, password) => {
    const { token } = await loginService.login(username, password);
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    loginService.logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
