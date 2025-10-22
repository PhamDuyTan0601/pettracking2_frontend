import React, { useState } from "react";
import { addPet } from "../api/api";
import { useNavigate } from "react-router-dom";

function AddPet() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addPet(userId, { name, species, breed, age });
      if (res.data.success) {
        alert("Pet added successfully!");
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Error adding pet");
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
        />
        <input
          placeholder="Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
        <input
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default AddPet;
