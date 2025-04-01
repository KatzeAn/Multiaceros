import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { DivisionModel } from "@/database/division/division.model";
import type { Division } from "@/domain/Interfaces/Division/division.interface";
import { stringToNumber } from "../common/helper/stringTonumber.helper";
import { useUserStore } from "./user.store";
import type { Teammate } from "@/domain/Interfaces/Division/teammate.interface";

export const useDivisionStore = defineStore("division", () => {
  const { t } = useI18n();
  const divisions = ref<Division[]>([]);
  const isLoading = ref(false);
  const userStore = useUserStore();
  const errorMessage = ref<string | null | undefined>(null);
  
  const fetchDivision = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const divisionModel = new DivisionModel();
      const data = await divisionModel.getDivisions(isActive);
      divisions.value = Array.isArray(data) ? [...data] : [];
      return divisions.value;
    } catch (error) {
      console.error(error);
      divisions.value = [];
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.divisionLoad"),
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
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
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
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
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
        title: t("notifications.success.title"),
        message: t("notifications.success.divisionDeleted"),
        type: "success",
      });
      await fetchDivision();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.divisionDelete"),
        type: "error",
      });
    }
  };

  const updateDivisionRequest = async (id: number, newName: string) => {
    try {
      isLoading.value = true;
      const divisionModel = new DivisionModel();
      const userId = userStore.getUserId;

      await divisionModel.updateDivision(id, newName, userId);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.divisionUpdated"),
        type: "success",
      });

      await fetchDivision();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.divisionUpdate"),
        type: "error",
      });
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

