import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const AddUserForm = () => {
  const { addUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ name: "", description: "", photo: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.photo) {
      alert("All fields are required!");
      return;
    }
    addUser(formData);
    setFormData({ name: "", description: "", photo: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Photo URL:</label>
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        Save
      </button>
    </form>
  );
};

export default AddUserForm;