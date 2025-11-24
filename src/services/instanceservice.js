import axios from "axios";

const API_URL = "http://localhost:5138/api/instances";

// Create an axios instance with the Authorization header
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Create a new instance
export const createInstance = async (instanceData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(API_URL, instanceData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Get all instances
export const getInstances = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};

// Get the authenticated user's instance
export const getMyInstance = async () => {
  const response = await axiosInstance.get("/my-instance");
  return response.data;
};

// Query an instance
export const queryInstance = async (payload) => {
  const response = await axiosInstance.post("/query", payload);
  return response.data;
};

// Get instances by user ID
export const getInstancesByUser = async (userId) => {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
};

// Check if an instance exists for a user
export const checkInstanceExists = async (userId) => {
  try {
    await getInstancesByUser(userId);
    return true; // Si la petición tiene éxito, significa que encontró una instancia
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false; // 404 significa que no encontró instancia para ese usuario
    }
    throw error; // Lanza otros errores (de red, de servidor, etc.)
  }
};


export default {
  createInstance,
  getInstances,
  getMyInstance,
  queryInstance,
  getInstancesByUser,
  checkInstanceExists,
};
