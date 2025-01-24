import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <UserProvider>
      <div>
        <h1>Contact Manager</h1>
        <button onClick={toggleForm}>{showForm ? "Close Form" : "Add Contact"}</button>
        {showForm && <AddUserForm />}
        <UserList />
      </div>
    </UserProvider>
  );
};

export default App;