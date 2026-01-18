import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if(savedUser && token) {
        return JSON.parse(savedUser);
    }
    return null;
  });

  const login = async (email, password) => {
    try{
        const res = await api.post("accounts/login/", {
            email,
            password,
        });

        localStorage.setItem("token", res.data.tokens.access);
        console.log(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setUser(res.data.user);
    } catch(error) {
        console.error("Login failed", error.response?.data);
        throw error;
    }
  };

  const register = async (data) => {
    const res = await api.post("accounts/register/", data);
    console.log("register", res.data.access);
    console.log("register", res.data.user);
    localStorage.setItem("token", res.data.access);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);
  };

  const updateUser = (newData) => {
    setUser(newData);
    localStorage.setItem("user", JSON.stringify(newData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);