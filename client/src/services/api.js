import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust as needed
  withCredentials: true,
});

// Auto set token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};
