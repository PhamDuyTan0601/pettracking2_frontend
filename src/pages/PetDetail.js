import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLatestPetData } from "../api/api";
import Navbar from "../components/Navbar";

function PetDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getLatestPetData(id);
        setData(res.data.data);
        setError("");
      } catch (err) {
        setError("Failed to load pet data");
        console.error("Error fetching pet data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Pet Latest Data</h2>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {data ? (
          <div className="pet-data">
            <p>
              <strong>Latitude:</strong> {data.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {data.longitude}
            </p>
            <p>
              <strong>Speed:</strong> {data.speed} m/s
            </p>
            <p>
              <strong>Activity:</strong>
              <span className={`activity ${data.activityType}`}>
                {data.activityType}
              </span>
            </p>
            <p>
              <strong>Battery:</strong> {data.batteryLevel}%
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(data.timestamp).toLocaleString()}
            </p>
          </div>
        ) : (
          !loading && <p>No data available for this pet.</p>
        )}
      </div>
    </>
  );
}

export default PetDetail;
