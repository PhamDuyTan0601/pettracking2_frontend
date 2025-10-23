import axios from "axios";

// ===============================
// 🌐 CONFIG
// ===============================
const API_URL =
  process.env.REACT_APP_API_URL || "https://pettracking2.onrender.com";

// ===============================
// 👤 USER APIs
// ===============================

// Đăng ký tài khoản
export const registerUser = (userData) =>
  axios.post(`${API_URL}/api/users/register`, userData);

// Đăng nhập và lưu token
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/users/login`, userData);

  // ✅ Lưu token và user vào localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response;
};

// Đăng xuất
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
};

// ===============================
// 🐾 PET APIs
// ===============================

// Helper để gửi token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Lấy danh sách pet của user hiện tại
export const getPetsByUser = async () =>
  axios.get(`${API_URL}/api/pets/my-pets`, getAuthHeader());

// Tạo pet mới (backend tự gán owner qua token)
export const addPet = async (petData) =>
  axios.post(`${API_URL}/api/pets`, petData, getAuthHeader());

// Lấy chi tiết 1 pet
export const getPetById = async (petId) =>
  axios.get(`${API_URL}/api/pets/${petId}`, getAuthHeader());

// ===============================
// 📈 PET DATA APIs
// ===============================
export const getLatestPetData = (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}/latest`);

export const getAllPetData = (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}`);
