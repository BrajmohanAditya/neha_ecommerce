import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

console.log("Axios Initialized with BaseURL:", import.meta.env.VITE_API_URL);

api.interceptors.request.use(
  (config) => {
    const tokenStr = sessionStorage.getItem("token");
    let token = null;
    try {
      token = tokenStr ? JSON.parse(tokenStr) : tokenStr;
    } catch (e) {
      token = tokenStr;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    if (error.response && error.response.status === 401) {
      // Logic to logout user or redirect to login
      // You might want to dispatch a logout action via store if available,
      // or simply clear storage and redirect.
      sessionStorage.removeItem("token");
      // avoiding window.location.reload() or href change to keep it SPA friendly if possible,
      // but for global 401, hard redirect is often safest to clear state.
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default api;
