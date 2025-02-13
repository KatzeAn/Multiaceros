import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { EmployeePotentialModel } from "@/database/employeePotential/employeePotential.model";
import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";

export const useEmployeePotentialStore = defineStore(
  "employeePotential",
  () => {
    const isLoading = ref(false);

    const fetchEmployeePotential = async () => {
      try {
        isLoading.value = true;
        const employeePotentialModel = new EmployeePotentialModel();
        const data = await employeePotentialModel.getAllEmployeesPotential();
        return Array.isArray(data) ? data : [];
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "No se pudieron cargar los empleados potenciales",
          type: "error",
        });
        return [];
      } finally {
        isLoading.value = false;
      }
    };

    const createEmployeePotentialRequest = async (data: EmployeePotential) => {
      try {
        isLoading.value = true;
        const employeePotentialModel = new EmployeePotentialModel();
        await employeePotentialModel.createEmployeePotential(data);
        await fetchEmployeePotential(); // Recargar lista después de crear
      } catch (error) {
        throw error;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      fetchEmployeePotential,
      createEmployeePotentialRequest,
    };
  }
);
