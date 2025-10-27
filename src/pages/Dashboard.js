import React, { useEffect, useState } from "react";
import { getPetsByUser, getAllPetData } from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import RealTimeMap from "../components/RealTimeMap";
import DashboardStats from "../components/DashboardStats";
import AlertSystem from "../components/AlertSystem";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petData, setPetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await getPetsByUser();
        const petsData = res.data.pets || [];
        setPets(petsData);

        console.log("Fetched Pets:", petsData); // Debug

        // Tự động chọn pet đầu tiên nếu có
        if (petsData.length > 0) {
          setSelectedPet(petsData[0]);
          await fetchPetData(petsData[0]._id);
        }
      } catch (err) {
        console.error("Error loading pets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const fetchPetData = async (petId) => {
    try {
      const res = await getAllPetData(petId);
      const data = res.data.data || [];
      setPetData(data);

      console.log("Fetched Pet Data for", petId, ":", data); // Debug

      // Nếu không có dữ liệu, tạo dữ liệu mẫu để test
      if (data.length === 0) {
        console.log("No data found, using sample data for testing");
        const sampleData = [
          {
            latitude: 10.8231,
            longitude: 106.6297,
            activityType: "walking",
            batteryLevel: 85,
            speed: 1.2,
            timestamp: new Date().toISOString(),
          },
        ];
        setPetData(sampleData);
      }
    } catch (err) {
      console.error("Error fetching pet data:", err);
      // Tạo dữ liệu mẫu nếu API fail
      const sampleData = [
        {
          latitude: 10.8231,
          longitude: 106.6297,
          activityType: "walking",
          batteryLevel: 85,
          speed: 1.2,
          timestamp: new Date().toISOString(),
        },
      ];
      setPetData(sampleData);
    }
  };

  const handlePetSelect = async (pet) => {
    setSelectedPet(pet);
    await fetchPetData(pet._id);
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="dashboard-header">
          <h2>🐾 Dashboard Theo Dõi Pet</h2>
          <Link to="/add-pet">
            <button style={{ marginBottom: 0 }}>+ Thêm Pet Mới</button>
          </Link>
        </div>

        {loading ? (
          <div className="loading">Đang tải dữ liệu...</div>
        ) : pets.length === 0 ? (
          <div className="no-pets">
            <p>Chưa có pet nào. Thêm pet đầu tiên của bạn!</p>
            <Link to="/add-pet">
              <button>Thêm Pet Đầu Tiên</button>
            </Link>
          </div>
        ) : (
          <>
            {/* Select Pet */}
            <div className="pet-selector">
              <label>Chọn Pet để theo dõi:</label>
              <select
                value={selectedPet?._id || ""}
                onChange={(e) => {
                  const pet = pets.find((p) => p._id === e.target.value);
                  if (pet) handlePetSelect(pet);
                }}
              >
                {pets.map((pet) => (
                  <option key={pet._id} value={pet._id}>
                    {pet.name} - {pet.species}
                  </option>
                ))}
              </select>
            </div>

            {selectedPet && (
              <>
                {/* Debug Info */}
                <div
                  style={{
                    background: "#f0f9ff",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}
                >
                  <strong>Debug Info:</strong>
                  Pet: {selectedPet.name} | Data Points: {petData.length} |
                  Current Position: {petData[0]?.latitude},{" "}
                  {petData[0]?.longitude}
                </div>

                {/* Stats Cards */}
                <DashboardStats petData={petData} selectedPet={selectedPet} />

                {/* Map and Alerts Grid */}
                <div className="grid-layout">
                  <div className="map-section">
                    <h3>🗺️ Bản Đồ Theo Dõi Thời Gian Thực</h3>
                    <RealTimeMap petData={petData} selectedPet={selectedPet} />
                  </div>

                  <div className="alerts-section">
                    <AlertSystem petData={petData} selectedPet={selectedPet} />
                  </div>
                </div>

                {/* Pet List */}
                <div className="pet-list-section">
                  <h3>📋 Danh Sách Pets Của Bạn</h3>
                  <div className="pets-grid">
                    {pets.map((pet) => (
                      <div
                        key={pet._id}
                        className={`pet-card ${
                          selectedPet?._id === pet._id ? "active" : ""
                        }`}
                        onClick={() => handlePetSelect(pet)}
                      >
                        <div className="pet-info">
                          <h4>{pet.name}</h4>
                          <p>
                            {pet.species} • {pet.breed}
                          </p>
                          <p>{pet.age} tuổi</p>
                        </div>
                        <div className="pet-status">
                          <span className="status-dot"></span>
                          <span>Đang hoạt động</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
