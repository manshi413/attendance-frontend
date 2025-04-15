import axios from 'axios';

const api = axios.create({
  baseURL: 'https://attendance-backend-ft07.onrender.com/api',
  withCredentials: true
});

// Auth endpoints
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (userData) => api.post('/signup', userData);

// Attendance endpoints
export const markAttendance = (data) => api.post('/attendance/mark', data);
export const getAttendance = () => api.get('/attendance');

export default api;
