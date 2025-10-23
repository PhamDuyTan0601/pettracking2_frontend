import axios from "axios";

// ===============================
// 🌐 CONFIG
// ===============================
const API_URL =
  process.env.REACT_APP_API_URL || "https://pettracking2.onrender.com";

// ===============================
// 👤 USER APIs
// ===============================
export const registerUser = (userData) =>
  axios.post(`${API_URL}/api/users/register`, userData);

export const loginUser = (userData) =>
  axios.post(`${API_URL}/api/users/login`, userData);

// ===============================
// 🐾 PET APIs
// ===============================

// Lấy tất cả pet của user hiện tại (đã login)
export const getPetsByUser = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/pets/my-pets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Tạo pet mới (backend tự gán owner qua token)
export const addPet = async (petData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/api/pets`, petData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Lấy thông tin chi tiết 1 pet
export const getPetById = async (petId) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/pets/${petId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ===============================
// 📈 PET DATA APIs
// ===============================

export const getLatestPetData = (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}/latest`);

export const getAllPetData = (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}`);
