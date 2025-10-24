import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddPet from "./pages/AddPet";
import PetDetail from "./pages/PetDetail";
import DeviceManagement from "./pages/DeviceManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ĐÃ BỎ forgot-password và reset-password routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        // Thêm vào Routes
        <Route path="/devices" element={<DeviceManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
