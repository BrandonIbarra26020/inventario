import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.defaults.withCredentials = true;

// Interceptor para manejar errores globales o agregar tokens
api.interceptors.response.use(
  response => response,
  error => {
    // Puedes manejar errores globales aquí
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
