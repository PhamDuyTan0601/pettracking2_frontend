import React, { useState } from "react";
import { addPet } from "../api/api";
import { useNavigate } from "react-router-dom";

function AddPet() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi đúng body cho backend
      const petData = { name, species, breed, age: Number(age) };
      const res = await addPet(petData);

      if (res.data.success) {
        alert("✅ Pet added successfully!");
        navigate("/dashboard");
      } else {
        alert("❌ " + (res.data.message || "Failed to add pet"));
      }
    } catch (err) {
      console.error("Error adding pet:", err);
      alert("❌ Server error while adding pet");
    }
  };

  return (
    <div className="container">
      <h2>Add New Pet</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Species (dog / cat / other)"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        />
        <input
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default AddPet;
