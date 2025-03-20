import { defineStore } from "pinia";
import { ref } from "vue";
import { EmployeeModel } from "@/database/employee/employee.model";
import { ElNotification } from "element-plus";

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
    } catch (error) {
      console.error("Error creating absence request:", error);
            ElNotification({
        title: "Error",
        message: "An error occurred while saving the form",
        type: "error",
            });
      throw error;
        }
  };

  return {
    error,
    downloadCertificate,
  };
});
