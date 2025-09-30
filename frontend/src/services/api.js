import axios from 'axios';

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api' 
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const authAPI = {
  studentRegister: (data) => API.post('/auth/register', data),
  studentLogin: (data) => API.post('/auth/login', data),
  adminLogin: (data) => API.post('/auth/admin/login', data),
};

export const complaintAPI = {
  createComplaint: (data) => API.post('/complaints', data),
  getMyComplaints: () => API.get('/complaints/my-complaints'),
  getAllComplaints: () => API.get('/complaints'),
  updateComplaint: (id, data) => API.put(`/complaints/${id}`, data),
  getStats: () => API.get('/complaints/stats'),
};

export const eventAPI = {
  getEvents: () => API.get('/events'),
  createEvent: (data) => API.post('/events', data),
  updateEvent: (id, data) => API.put(`/events/${id}`, data),
  deleteEvent: (id) => API.delete(`/events/${id}`),
};

export default API;