import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { DivisionModel } from "@/database/division/division.model";
import type { Division } from "@/domain/Interfaces/Division/division.interface";
import { stringToNumber } from "../common/helper/stringTonumber.helper";
import { useUserStore } from "./user.store";
import type { Teammate } from "@/domain/Interfaces/Division/teammate.interface";

export const useDivisionStore = defineStore("division", () => {
  const isLoading = ref(false);
  const userStore = useUserStore();

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

  const fetchMyTeammate = async () => {
    const userId = stringToNumber(userStore.getUserId);

    if (userId === null) {
      throw new Error("An unexpected error");
    }

    const result = {
      loading: true,
      teammateList: [] as Teammate[],
    };

    try {
      result.loading = true;
      const divisionService = new DivisionModel();
      const response: Teammate[] = await divisionService.getTeammates(userId);
      result.teammateList = response;
    } catch (error) {
      console.error("Error fetching teammates:", error);
      result.teammateList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  const deleteDivisionRequest = async (id: number) => {
    try {
      isLoading.value = true;
      const divisionModel = new DivisionModel();
      const userId = userStore.getUserId;
      await divisionModel.deleteDivision(id, userId);
      
      ElNotification({
        title: "Éxito",
        message: "Departamento desactivado con éxito.",
        type: "success",
      });
      await fetchDivision();
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudo desactivar el departamento.",
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const updateDivisionRequest = async (id: number, newName: string) => {
    try {
      isLoading.value = true;
      const divisionModel = new DivisionModel();
      const userStore = useUserStore(); 
      const userId = userStore.getUserId;

      await divisionModel.updateDivision(id, newName, userId);

      ElNotification({
        title: "Éxito",
        message: "Departamento actualizado con éxito.",
        type: "success",
      });

      await fetchDivision();
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudo actualizar el departamento.",
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetchDivision,
    createDivisionRequest,
    fetchMyTeammate,
    deleteDivisionRequest,
    updateDivisionRequest, 
  };
});
