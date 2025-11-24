import axios from "axios";

const API_URL = "http://localhost:5138/api/instances";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

/**
 * Crea una nueva instancia (base de datos lógica y usuario MySQL).
 * @param {object} instanceData - Los datos completos para crear la instancia.
 */
export const createInstance = async (instanceData) => {
  const response = await axiosInstance.post("/", instanceData);
  return response.data;
};

/**
 * Obtiene la instancia asignada al usuario autenticado.
 */
export const getMyInstance = async () => {
  const response = await axiosInstance.get("/my-instance");
  return response.data;
};

/**
 * Ejecuta una consulta SQL en la instancia del usuario autenticado.
 * @param {object} payload - Objeto que contiene la consulta y el motor.
 * @param {string} payload.query - La consulta SQL a ejecutar.
 * @param {string} payload.engine - El motor de la base de datos (ej. "mysql", "postgresql").
 */
export const queryInstance = async ({ query, engine }) => {
  // Ahora enviamos tanto la query como el engine
  const response = await axiosInstance.post("/query", { query, engine });
  return response.data;
};

/**
 * Obtiene todas las instancias (para el Admin).
 */
export const getAllInstances = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};

/**
 * Activa (desbloquea) una instancia.
 * @param {number} instanceId - El ID de la instancia a activar.
 */
export const startInstance = async (instanceId) => {
  const response = await axiosInstance.put(`/${instanceId}/start`);
  return response.data;
};

/**
 * Desactiva (bloquea) una instancia.
 * @param {number} instanceId - El ID de la instancia a desactivar.
 */
export const stopInstance = async (instanceId) => {
  const response = await axiosInstance.put(`/${instanceId}/stop`);
  return response.data;
};

export default {
  createInstance,
  getMyInstance,
  queryInstance,
  getAllInstances,
  startInstance,
  stopInstance,
};
