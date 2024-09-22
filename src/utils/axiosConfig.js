import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token');
  const token = sessionStorage.getItem('token');

  console.log("ENV....>>>>", process.env.REACT_APP_BACKEND_URL)
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
