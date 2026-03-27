import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ FIXED LOGIN (SAVE ALSO)
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data)); // ⭐ important
  };

  // ✅ FIXED UPDATE (NO STALE STATE)
  const updateUser = (newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("user", JSON.stringify(updated)); // ⭐ correct
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, updateUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};