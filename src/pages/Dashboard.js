import "../styles.css";
import React, { useEffect, useState } from "react";
import {
  getPetsByUser as getMyPets,
  getLatestPetData as getPetLatestData,
} from "../api/api";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [petActivity, setPetActivity] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPets = async () => {
      const res = await getMyPets(userId);
      setPets(res.data.pets);

      const activityData = {};
      for (const pet of res.data.pets) {
        try {
          const dataRes = await getPetLatestData(userId, pet._id);
          const latest = dataRes.data.data;
          if (latest) {
            activityData[pet._id] = {
              activityType: latest.activityType,
              speed: latest.speed,
            };
          }
        } catch (err) {
          console.error("Error loading pet data:", err);
        }
      }
      setPetActivity(activityData);
    };

    fetchPets();
  }, [userId]);

  const activityEmoji = (type) => {
    switch (type) {
      case "resting":
        return "😴";
      case "walking":
        return "🚶‍♂️";
      case "running":
        return "🏃‍♂️";
      case "playing":
        return "🐕";
      default:
        return "❓";
    }
  };

  return (
    <div className="container">
      <h2>🐾 My Pets Dashboard</h2>
      <button onClick={() => navigate("/add-pet")}>Add New Pet</button>
      <ul>
        {pets.map((pet) => {
          const act = petActivity[pet._id];
          return (
            <li
              key={pet._id}
              className="pet-card"
              onClick={() => navigate(`/pet/${pet._id}`)}
            >
              <div>
                <strong>{pet.name}</strong> ({pet.species}, {pet.age} yrs)
              </div>
              <div className={`activity ${act ? act.activityType : "unknown"}`}>
                {act ? (
                  <>
                    {activityEmoji(act.activityType)} {act.activityType}{" "}
                    {act.speed ? `(${act.speed.toFixed(1)} m/s)` : ""}
                  </>
                ) : (
                  "❓ no data"
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dashboard;
