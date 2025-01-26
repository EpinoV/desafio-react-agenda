import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const UserList = () => {
  const { users, loading, fetchUsers, deleteUser } = useContext(UserContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchUsers(1, 5, e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Esta seguro de eliminar este contacto?")) {
      deleteUser(id);
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar contactos..."
          value={search}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Descripción</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.description}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;