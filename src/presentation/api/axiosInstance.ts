import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Función genérica para manejar peticiones HTTP con axiosInstance
 */
export async function apiRequest<T>(
  method: "get" | "post" | "patch" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      ...config, // Permite agregar headers u otras opciones
    });
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data as {
        error?: { details?: string };
        title?: string;
        errors?: Record<string, string[]>;
      };

      if (apiError?.errors) {
        const errorMessages = Object.entries(apiError.errors)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join(" | ");
        throw new Error(errorMessages || "Error de validación en la solicitud");
      }

      throw new Error(
        apiError?.error?.details || apiError?.title || "Error en la solicitud"
      );
    } else {
      throw new Error("Error inesperado en la solicitud");
    }
  }
}

export default axiosInstance;
