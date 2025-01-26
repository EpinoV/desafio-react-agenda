import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import PropTypes from "prop-types";  // Importamos PropTypes

const AddUserForm = ({ closeDrawer }) => {
  const { addUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: "", description: "", photo: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.photo) {
      alert("Todos los campos son requeridos!");
      return;
    }
    addUser(formData);
    setFormData({ name: "", description: "", photo: "" });
    closeDrawer();  // Cerrar el drawer después de agregar un usuario
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData({ name: "", description: "", photo: "" });
    closeDrawer();  // Cerrar el drawer después de agregar un usuario
  };


  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between">
        <button
              onClick={handleCancel}
              className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Guardar
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Descripción:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">URL Imagen:</label>
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
    </form>
  );
};

// Validamos las props del componente
AddUserForm.propTypes = {
  closeDrawer: PropTypes.func.isRequired,  // Validamos que closeDrawer sea una función
};

export default AddUserForm;
