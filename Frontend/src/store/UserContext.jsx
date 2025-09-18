import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ new state

  // Load from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // ✅ context ready
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = (profileData) => {
    setUser((prev) => ({ ...prev, ...profileData }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...profileData }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
};
