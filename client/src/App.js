import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeDrawer = () => {
    setShowForm(false);
  };

  return (
    <UserProvider>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-4">Contact Manager</h1>
        <button
          onClick={toggleForm}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600"
        >
          {showForm ? "Cerrar Ventana" : "Agregar Contacto"}
        </button>
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-10 transition-all ${showForm ? "block" : "hidden"}`} onClick={closeDrawer}></div>
        <div
          className={`fixed top-0 right-0 w-2/5 h-full bg-white shadow-lg transform transition-all z-20 ${showForm ? "translate-x-0" : "translate-x-full"}`}
        >
          <AddUserForm closeDrawer={closeDrawer} /> {/* Pasamos closeDrawer como prop */}
          <div className="absolute top-4 left-4 cursor-pointer" onClick={closeDrawer}>
            <button className="text-2xl font-bold">×</button>
          </div>
          <div className="absolute bottom-4 right-4">
            <button
              onClick={closeDrawer}
              className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </div>
        <UserList />
      </div>
    </UserProvider>
  );
};

export default App;
