import axios from "axios";

// ===============================
// 🌐 CONFIG
// ===============================
const API_URL =
  process.env.REACT_APP_API_URL || "https://pettracking2.onrender.com";

// Tạo instance axios với config mặc định
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor để tự động thêm token vào headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===============================
// 👤 USER APIs
// ===============================

// Đăng ký tài khoản
export const registerUser = (userData) =>
  api.post("/api/users/register", userData);

// Đăng nhập, nhận token
export const loginUser = async (userData) => {
  const response = await api.post("/api/users/login", userData);
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
};

// ===============================
// 🐾 PET APIs
// ===============================

// Lấy danh sách pet của user hiện tại
export const getPetsByUser = async () => api.get("/api/pets/my-pets");

// Tạo pet mới
export const addPet = async (petData) => api.post("/api/pets", petData);

// Lấy chi tiết 1 pet
export const getPetById = async (petId) => api.get(`/api/pets/${petId}`);

// ===============================
// 📈 PET DATA APIs
// ===============================
export const getLatestPetData = (petId) =>
  api.get(`/api/petData/pet/${petId}/latest`);

export const getAllPetData = (petId) => api.get(`/api/petData/pet/${petId}`);
