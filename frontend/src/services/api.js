import axios from "axios"

const API = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api" 
})

// Add request interceptor for logging
API.interceptors.request.use((req) => {
  console.log('🚀 API Request:', req.method?.toUpperCase(), req.url);
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

// Add response interceptor for error handling
API.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url, error.response?.data);
    return Promise.reject(error);
  }
)

export const authAPI = {
  studentRegister: (data) => API.post("/auth/register", data),
  studentLogin: (data) => API.post("/auth/login", data),
  adminLogin: (data) => API.post("/auth/admin/login", data),
}

export const complaintAPI = {
  createComplaint: (data) => API.post("/complaints", data),
  getMyComplaints: () => API.get("/complaints/my-complaints"),
  getAllComplaints: () => API.get("/complaints"),
  updateComplaint: (id, data) => API.put(`/complaints/${id}`, data),
  getStats: () => API.get("/complaints/stats"),
}

export const eventAPI = {
  getEvents: () => API.get("/events"),
  createEvent: (data) => API.post("/events", data),
  updateEvent: (id, data) => API.put(`/events/${id}`, data),
  deleteEvent: (id) => API.delete(`/events/${id}`),
}

export default API
