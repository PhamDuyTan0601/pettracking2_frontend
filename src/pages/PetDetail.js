import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLatestPetData as getPetLatestData } from "../api/api";

function PetDetail() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPetLatestData(userId, id);
      setData(res.data.data);
    };
    fetchData();
  }, [id, userId]);

  return (
    <div className="container">
      <h2>Pet Latest Data</h2>
      {data ? (
        <>
          <p>Latitude: {data.latitude}</p>
          <p>Longitude: {data.longitude}</p>
          <p>Speed: {data.speed} m/s</p>
          <p>Activity: {data.activityType}</p>
          <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PetDetail;
