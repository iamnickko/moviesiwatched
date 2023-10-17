import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MovieContext, MovieContextProvider } from "./store/MovieContext";
import { AuthContext, AuthContextProvider } from "./store/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider value={AuthContext}>
      <MovieContextProvider value={MovieContext}>
        <App />
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
