import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { EmployeeModel } from "@/database/employee/employee.model";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";

export const useEmployeeStore = defineStore("employee", () => {
  const isLoading = ref(false);

  const fetchEmployee = async () => {
    try {
      isLoading.value = true;
      const employeeModel = new EmployeeModel();
      const data = await employeeModel.getEmployees();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los empleados",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createEmployeeRequest = async (data: EmployeeRequest) => {
    try {
      isLoading.value = true;
      const employeeModel = new EmployeeModel();
      await employeeModel.createEmployee(data);
      await fetchEmployee(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetchEmployee,
    createEmployeeRequest,
  };
});
