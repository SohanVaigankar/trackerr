import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// components
import PrivateRoute from "./routes/PrivateRoute";

// pages
import Home from "./pages/Home";
import VehicleInfo from "./pages/VehicleInfo";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/vehicle-info/:vid-:vrn"
          element={
            <PrivateRoute>
              <VehicleInfo />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
