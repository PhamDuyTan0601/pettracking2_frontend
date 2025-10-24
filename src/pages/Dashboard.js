import React, { useEffect, useState } from "react";
import { getPetsByUser } from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetsByUser();
        setPets(res.data.pets || []);
      } catch (err) {
        alert("Failed to load pets");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>🐾 Your Pets</h2>

        {loading ? (
          <div className="loading">Loading pets...</div>
        ) : pets.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>No pets found. Add your first pet!</p>
            <Link to="/add-pet">
              <button>Add Your First Pet</button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/add-pet">
              <button>+ Add New Pet</button>
            </Link>
            <ul>
              {pets.map((pet) => (
                <Link
                  key={pet._id}
                  to={`/pet/${pet._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <li className="pet-card">
                    <div>
                      <strong>{pet.name}</strong>
                      <div style={{ fontSize: "14px", color: "#666" }}>
                        {pet.species} • {pet.breed} • {pet.age} years old
                      </div>
                    </div>
                    <div className="activity unknown">● View Details</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
