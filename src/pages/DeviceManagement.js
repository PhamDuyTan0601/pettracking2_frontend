import React, { useState, useEffect } from "react";
import { getPetsByUser, registerDevice, getMyDevices } from "../api/api";
import Navbar from "../components/Navbar";

function DeviceManagement() {
  const [pets, setPets] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPets();
    fetchDevices();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await getPetsByUser();
      setPets(res.data.pets || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const fetchDevices = async () => {
    try {
      const res = await getMyDevices();
      setDevices(res.data.devices || []);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!deviceId || !selectedPet) {
      alert("Vui lòng nhập Device ID và chọn pet");
      return;
    }

    setLoading(true);
    try {
      await registerDevice(deviceId, selectedPet);
      alert("✅ Đăng ký device thành công!");
      setDeviceId("");
      setSelectedPet("");
      fetchDevices(); // Refresh list
    } catch (error) {
      alert(
        "❌ Lỗi đăng ký device: " +
          (error.response?.data?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const generateDeviceId = () => {
    const newId =
      "ESP32_" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setDeviceId(newId);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>📱 Quản lý Devices</h2>

        {/* Form đăng ký device */}
        <div className="card" style={{ marginBottom: "30px", padding: "20px" }}>
          <h3>➕ Đăng ký Device Mới</h3>
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: "15px" }}>
              <label>Device ID:</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  placeholder="Nhập Device ID"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  style={{ flex: 1 }}
                  required
                />
                <button type="button" onClick={generateDeviceId}>
                  🎲 Tạo ID
                </button>
              </div>
              <small>Device ID từ ESP32 hoặc tạo mới</small>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Chọn Pet:</label>
              <select
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                required
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">-- Chọn pet --</option>
                {pets.map((pet) => (
                  <option key={pet._id} value={pet._id}>
                    {pet.name} ({pet.species})
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng ký..." : "📝 Đăng ký Device"}
            </button>
          </form>
        </div>

        {/* Danh sách devices */}
        <div className="card">
          <h3>📋 Devices Đã Đăng Ký</h3>
          {devices.length === 0 ? (
            <p>Chưa có device nào được đăng ký</p>
          ) : (
            <div className="devices-list">
              {devices.map((device) => (
                <div key={device._id} className="device-item">
                  <div className="device-info">
                    <strong>Device ID: {device.deviceId}</strong>
                    <div>
                      <span className="pet-badge">
                        Pet: {device.petId?.name}
                      </span>
                      <span className="species-badge">
                        {device.petId?.species}
                      </span>
                    </div>
                    <small>
                      Cập nhật: {new Date(device.lastSeen).toLocaleString()}
                    </small>
                  </div>
                  <div className="device-status">
                    <span
                      className={`status ${
                        device.isActive ? "active" : "inactive"
                      }`}
                    >
                      {device.isActive ? "🟢 Active" : "🔴 Inactive"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hướng dẫn sử dụng */}
        <div
          className="card"
          style={{ marginTop: "30px", background: "#f0f9ff" }}
        >
          <h3>📖 Hướng Dẫn Sử Dụng</h3>
          <ol>
            <li>
              <strong>Tạo Device ID</strong> - Nhấn nút "Tạo ID" hoặc nhập ID từ
              ESP32
            </li>
            <li>
              <strong>Chọn Pet</strong> - Chọn pet mà device sẽ theo dõi
            </li>
            <li>
              <strong>Đăng ký</strong> - Nhấn "Đăng ký Device"
            </li>
            <li>
              <strong>Cấu hình ESP32</strong> - Dùng Device ID trong code ESP32
            </li>
          </ol>
          <div
            style={{
              background: "#e2e8f0",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            <strong>Code ESP32 mẫu:</strong>
            <code style={{ display: "block", marginTop: "5px" }}>
              String deviceId = "{deviceId || "ESP32_ABC123XYZ"}";
            </code>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeviceManagement;
