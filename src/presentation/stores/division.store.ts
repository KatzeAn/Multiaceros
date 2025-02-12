import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { DivisionModel } from "@/database/division/division.model";
import type { Division } from "@/domain/Interfaces/Division/division.interface";

export const useDivisionStore = defineStore("division", () => {
  const isLoading = ref(false);

  const fetchDivision = async () => {
    try {
      isLoading.value = true;
      const divisionModel = new DivisionModel();
      const data = await divisionModel.getDivisions();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los departamentos",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createDivisionRequest = async (data: Division) => {
    try {
      isLoading.value = true;
      const divisionModel = new DivisionModel();
      await divisionModel.createDivision(data.name, data.createdBy ?? "");
      await fetchDivision(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetchDivision,
    createDivisionRequest,
  };
});
