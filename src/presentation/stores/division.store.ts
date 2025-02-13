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

  return {
    isLoading,
    fetchDivision,
    createDivisionRequest,
    fetchMyTeammate,
  };
});
