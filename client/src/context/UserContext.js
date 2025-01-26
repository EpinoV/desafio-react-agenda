import React, { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0); // Agregamos el estado para el total de contactos

  const fetchUsers = useCallback(async (page = 1, limit = 5, query = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/users?_page=${page}&_limit=${limit}&q=${query}`
      );
      const data = await response.json();
      // Actualizamos los usuarios y el total de usuarios
      setUsers(data);  // Asumimos que `data` es una lista de contactos
      // Si la API no te da el número total de usuarios, podrías hacer un cálculo estimado aquí
      setTotalUsers(18);  // Ajusta este valor según tu lógica o configuración, debo corregirlo
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
    <UserContext.Provider value={{ users, loading, fetchUsers, addUser, deleteUser, totalUsers }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
