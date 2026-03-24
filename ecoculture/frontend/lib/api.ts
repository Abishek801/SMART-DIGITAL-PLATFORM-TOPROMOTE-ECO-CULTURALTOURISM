// lib/api.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT on every request
api.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${(session as any).accessToken}`;
  }
  return config;
});

// ─── Destinations ───────────────────────────────────────
export const destinationApi = {
  getAll: (params?: Record<string, string>) => api.get("/destinations", { params }),
  getBySlug: (slug: string) => api.get(`/destinations/${slug}`),
  getFeatured: () => api.get("/destinations?featured=true"),
  search: (query: string) => api.get(`/destinations/search?q=${query}`),
};

// ─── Itineraries ────────────────────────────────────────
export const itineraryApi = {
  generate: (data: {
    destination: string;
    duration: number;
    budget: string;
    travelStyle: string;
    interests: string[];
    carbonPriority: boolean;
  }) => api.post("/itineraries/generate", data),
  getUserItineraries: () => api.get("/itineraries/my"),
  getById: (id: string) => api.get(`/itineraries/${id}`),
  save: (id: string) => api.post(`/itineraries/${id}/save`),
  delete: (id: string) => api.delete(`/itineraries/${id}`),
};

// ─── Products / Shop ────────────────────────────────────
export const shopApi = {
  getProducts: (params?: Record<string, string>) => api.get("/products", { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  createOrder: (data: { items: { productId: string; quantity: number }[]; address: object }) =>
    api.post("/orders", data),
  getUserOrders: () => api.get("/orders/my"),
};

// ─── Bookings ───────────────────────────────────────────
export const bookingApi = {
  create: (data: {
    destinationId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    notes?: string;
  }) => api.post("/bookings", data),
  getUserBookings: () => api.get("/bookings/my"),
  cancel: (id: string) => api.patch(`/bookings/${id}/cancel`),
};

// ─── Auth ───────────────────────────────────────────────
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),
  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }),
  resetPassword: (token: string, password: string) =>
    api.post("/auth/reset-password", { token, password }),
};

// ─── User ───────────────────────────────────────────────
export const userApi = {
  getProfile: () => api.get("/users/me"),
  updateProfile: (data: Partial<{ name: string; image: string }>) =>
    api.put("/users/me", data),
  getSavedDestinations: () => api.get("/users/me/saved-destinations"),
  saveDestination: (destId: string) => api.post(`/users/me/saved-destinations/${destId}`),
  unsaveDestination: (destId: string) => api.delete(`/users/me/saved-destinations/${destId}`),
};

export default api;
