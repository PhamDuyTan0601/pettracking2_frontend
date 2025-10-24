import React, { useState } from "react";
import { addPet } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddPet() {
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet(form);
      alert("✅ Pet added!");
      navigate("/dashboard");
    } catch {
      alert("❌ Error adding pet");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Add New Pet</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Species"
            value={form.species}
            onChange={(e) => setForm({ ...form, species: e.target.value })}
            required
          />
          <input
            placeholder="Breed"
            value={form.breed}
            onChange={(e) => setForm({ ...form, breed: e.target.value })}
            required
          />
          <input
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
          <button type="submit">Add Pet</button>
        </form>
      </div>
    </>
  );
}

export default AddPet;
