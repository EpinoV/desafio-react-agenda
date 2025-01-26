import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const UserList = () => {
  const { users, loading, fetchUsers, deleteUser, totalUsers } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, search);
  }, [currentPage, itemsPerPage, search, fetchUsers]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reiniciar la página al buscar
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de eliminar este contacto?")) {
      deleteUser(id);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  // Solo mostrar el paginador si hay más de 1 página
  if (totalPages <= 1) return null;

  // Calculamos los números de página a mostrar (máximo 5 números)
  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - 2);  // Aseguramos que la página inicial no sea menor que 1
  const endPage = Math.min(totalPages, startPage + 4);  // Aseguramos que la página final no exceda el total de páginas

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

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
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Paginador */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          {/* Botón retroceder */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            {"<"}
          </button>

          {/* Números de página */}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'} hover:bg-gray-300 rounded-lg`}
            >
              {number}
            </button>
          ))}

          {/* Botón avanzar */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
