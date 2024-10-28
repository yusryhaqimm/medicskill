import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Your Django API URL
  withCredentials: true,  // Ensures cookies (like CSRF tokens) are sent
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products/');  // Adjust endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;  // Handle error properly
  }
};
