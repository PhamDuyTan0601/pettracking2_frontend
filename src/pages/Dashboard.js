import React, { useEffect, useState } from "react";
import { getPetsByUser } from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetsByUser();
        setPets(res.data.pets || []);
      } catch {
        alert("Failed to load pets");
      }
    };
    fetchPets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>🐾 Your Pets</h2>
        {pets.length === 0 ? (
          <p>No pets found. Add one!</p>
        ) : (
          pets.map((pet) => (
            <div key={pet._id}>
              <Link to={`/pet/${pet._id}`}>{pet.name}</Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Dashboard;
