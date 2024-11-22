// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = {
  // User endpoints
  register: (userData) => axios.post(`${API_BASE_URL}/users/register`, userData),
  login: (credentials) => axios.post(`${API_BASE_URL}/users/login`, credentials),
  
  // Product endpoints
  getProducts: () => axios.get(`${API_BASE_URL}/products`),
  getProductsByCategory: (category) => axios.get(`${API_BASE_URL}/products/${category}`),
  
  // Cart endpoints
  addToCart: (productData) => axios.post(`${API_BASE_URL}/cart/add`, productData),
  getCart: (userId) => axios.get(`${API_BASE_URL}/cart/${userId}`)
};

export default api;