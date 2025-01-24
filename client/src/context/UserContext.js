import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (page = 1, limit = 5, query = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/users?_page=${page}&_limit=${limit}&q=${query}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, loading, fetchUsers, addUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};