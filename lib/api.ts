// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://adedamola.pythonanywhere.com', // or your updated backend
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // adapt this as needed
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
