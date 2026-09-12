import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const bookAppointment = (payload) => api.post("/appointments", payload);
export const sendContactMessage = (payload) => api.post("/contact", payload);
export const fetchDoctors = () => api.get("/doctors");
export const fetchTestimonials = () => api.get("/testimonials");

// --- admin (staff-only) ---
export const adminLogin = (payload) => api.post("/admin/login", payload);
export const adminGetAppointments = (token) =>
  api.get("/admin/appointments", { headers: { Authorization: `Bearer ${token}` } });
export const adminUpdateAppointmentStatus = (token, id, status) =>
  api.patch(`/admin/appointments/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
export const adminGetContacts = (token) =>
  api.get("/admin/contact", { headers: { Authorization: `Bearer ${token}` } });

export default api;
