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

// Đăng nhập
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/api/users/login`, userData);

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

// Quên mật khẩu (gửi email khôi phục)
export const forgotPassword = (email) =>
  axios.post(`${API_URL}/api/users/forgot-password`, { email });

// Đặt lại mật khẩu (sau khi nhấn link trong email)
export const resetPassword = (token, newPassword) =>
  axios.post(`${API_URL}/api/users/reset-password/${token}`, { newPassword });

// ===============================
// 🐾 PET APIs
// ===============================

// Helper để gửi token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found!");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Lấy danh sách pet của user hiện tại
export const getPetsByUser = async () =>
  axios.get(`${API_URL}/api/pets/my-pets`, getAuthHeader());

// Tạo pet mới
export const addPet = async (petData) =>
  axios.post(`${API_URL}/api/pets`, petData, getAuthHeader());

// Lấy chi tiết 1 pet (chỉ owner thấy)
export const getPetById = async (petId) =>
  axios.get(`${API_URL}/api/pets/${petId}`, getAuthHeader());

// ===============================
// 📈 PET DATA APIs
// ===============================
export const getLatestPetData = async (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}/latest`, getAuthHeader());

export const getAllPetData = async (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}`, getAuthHeader());

// ===============================
// 🧩 AXIOS INTERCEPTOR (TỰ ĐĂNG XUẤT NẾU TOKEN HẾT HẠN)
// ===============================
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Token expired or invalid. Logging out...");
      logoutUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
