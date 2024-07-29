// axiosInstance.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized Access - Redirect to login page
      navigate('/signin');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
