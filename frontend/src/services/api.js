import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:9014/api';

const api = axios.create({ baseURL: API_BASE });

// Attach token to admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Products
export const getProducts = (category) =>
  api.get('/products', { params: category ? { category } : {} });

export const getProductById = (id) => api.get(`/products/${id}`);

export const createProduct = (formData) =>
  api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const updateProduct = (id, formData) =>
  api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Admin
export const loginAdmin = (credentials) => api.post('/admin/login', credentials);

export default api;
