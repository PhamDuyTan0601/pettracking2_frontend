import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddPet from "./pages/AddPet";
import PetDetail from "./pages/PetDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/pet/:id" element={<PetDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
