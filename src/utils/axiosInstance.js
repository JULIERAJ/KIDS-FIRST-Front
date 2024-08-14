// axiosInstance.js
import axios from 'axios';

const API_PORT = process.env.REACT_APP_API_PORT;
const API_URL = `http://localhost:${API_PORT}/api/v1/`;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
// Request Interceptor
axiosInstance.interceptors.request.use(
  config => config,
  error => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      error.unauthorized = true;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
