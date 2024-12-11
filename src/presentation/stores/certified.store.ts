import { defineStore } from "pinia";
import axiosInstance from "../api/axiosInstance"; // Importa tu configuración de Axios
import { ref } from "vue";

export const useCertifiedStore = defineStore("certified", () => {
  // Estado
  const error = ref<string | null>(null); // Guardará cualquier error

  // Acción para descargar el archivo
  const downloadCertificate = async (userId: string) => {
    error.value = null;

    try {
      // Realizar la solicitud al endpoint para obtener el archivo
      const response = await axiosInstance.get(`/Employee/${userId}/employment-certificate`, {
        responseType: "blob", // Especificamos que el tipo de respuesta es un archivo binario
      });

      // Crear una URL temporal para el archivo
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);

      // Crear un enlace para la descarga
      const link = document.createElement("a");
      link.href = url;

      // Definir el nombre del archivo descargado
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") || "certificado.pdf"
        : "certificado.pdf";
      link.download = fileName;

      // Iniciar la descarga
      link.click();

      // Limpiar la URL temporal
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      // Manejar errores
      console.error("Error al descargar el certificado:", err);
      error.value = err.response?.data?.message || "Ocurrió un error al descargar el certificado.";
    } finally {
      // Finalizar carga
    }
  };

  return {
    error,
    downloadCertificate,
  };
});