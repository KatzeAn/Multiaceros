import { defineStore } from "pinia";
import { ref } from "vue";
import { EmployeeModel } from "@/database/employee/employee.model";

export const useCertifiedStore = defineStore("certified", () => {
  const error = ref<string | null>(null);

  const downloadCertificate = async (userId: number) => {
    error.value = null;

    try {
      const employeeService = new EmployeeModel();
      const response = await employeeService.getEmploymentCertificate(userId);

      const url = window.URL.createObjectURL(response);

      const link = document.createElement("a");
      link.href = url;

      const fileName = `certificado_${userId}.pdf`; 
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      error.value = err.message || "Ocurrió un error al descargar el certificado.";
    }
  };

  return {
    error,
    downloadCertificate,
  };
});
