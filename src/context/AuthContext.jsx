import { createContext, useContext, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  // loading=true on startup because we don't know if user
  // is logged in until we check with the server

  // On app startup, check if the user has a valid session
    // The cookie is sent automatically — we just need the user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("accounts/profile/");
        setUser(res.data);
      } catch (error) {
        // No valid session - user is not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Listen for forced logout events (from axios interceptor)
  useEffect(() => {
    const handleForcedLogout = () => {
        setUser(null);
    };

    window.addEventListener('auth:logout', handleForcedLogout);
    return () => window.removeEventListener('auth:logout', handleForcedLogout);
  }, []);

  const login = async (email, password) => {
    try{
        const res = await api.post("accounts/login/", {
            email,
            password,
        }, { withCredentials: true });
        // Cookies are set by the browser automatically from Set-Cookie header
        // We just save the user data
        setUser(res.data.user);
        return res.data.user;
    } catch(error) {
        console.error("Login failed", error.response?.data);
        throw error;
    }
  };

  const register = async (data) => {
    const res = await api.post("accounts/register/", data);

    return res.data;  // { message, email }
  };

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }))
  };

  // For OAuth login — replaces user entirely
    // No merging with previous session
  const setOAuthUser = (userData) => {
      setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("accounts/logout/");
    } catch (error) {
      // Even if server logout fails, clear local state
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      // Cookies are cleared by the server's response
    }
  };

  // Show nothing while checking auth status
  // Prevents flash of login page for authenticated users
  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <p>Loading...</p>
          </div>
      );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, setOAuthUser, isAuthenticated: !!user, }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);