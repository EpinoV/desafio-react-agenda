import React from "react";
import ReactDOM from "react-dom/client"; // Cambiado a "react-dom/client" para React 18
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Usar createRoot en lugar de render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
