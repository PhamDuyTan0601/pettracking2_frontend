import axios from "axios";

// Dùng biến môi trường để backend dễ đổi host
const API_URL =
  process.env.REACT_APP_API_URL || "https://pettracking2.onrender.com";

// ========== USER ==========
export const registerUser = (userData) =>
  axios.post(`${API_URL}/api/users/register`, userData);
export const loginUser = (userData) =>
  axios.post(`${API_URL}/api/users/login`, userData);

// ========== PET ==========
export const getPetsByUser = (userId) =>
  axios.get(`${API_URL}/api/pets/user/${userId}`);
export const addPet = (userId, petData) =>
  axios.post(`${API_URL}/api/pets/${userId}`, petData);
export const getPetById = (petId) => axios.get(`${API_URL}/api/pets/${petId}`);

// ========== PET DATA ==========
export const getLatestPetData = (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}/latest`);
export const getAllPetData = (petId) =>
  axios.get(`${API_URL}/api/petData/pet/${petId}`);
