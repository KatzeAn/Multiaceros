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

    const fetchEmployeePotentialByDocument = async (numberDocument: number) => {
      try {
        isLoading.value = true;
        const employeePotentialModel = new EmployeePotentialModel();
        const data = await employeePotentialModel.getEmployeePotentialByDocument(numberDocument);
        return data;
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "No se pudo cargar el candidato",
          type: "error",
        });
        return null;
      } finally {
        isLoading.value = false;
      }
    };

    const createEmployeePotentialRequest = async (data: EmployeePotential, file: File) => {
      try {
        isLoading.value = true;
        const employeePotentialModel = new EmployeePotentialModel();
        await employeePotentialModel.createEmployeePotential(data, file);
        ElNotification({
          title: "Éxito",
          message: "Empleado potencial creado correctamente",
          type: "success",
        });
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "No se pudo crear el empleado potencial",
          type: "error",
        });
        throw error;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      fetchEmployeePotential,
      createEmployeePotentialRequest,
      fetchEmployeePotentialByDocument
    };
  }
);
