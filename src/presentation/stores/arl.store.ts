import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { ArlModel } from "@/database/arl/arl.model";
import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";
import { useUserStore } from "./user.store";
import { useI18n } from "vue-i18n";

export const useArlStore = defineStore("arl", () => {
  const { t } = useI18n();
  const arlList = ref<Arl[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchArl = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const arlModel = new ArlModel();
      const data = await arlModel.getAll(isActive);
      arlList.value = Array.isArray(data) ? [...data] : [];
      return arlList.value;
    } catch (error) {
      console.error(error);
      arlList.value = [];
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.arlLoad"),
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createArlRequest = async (data: Arl) => {
    try {
      isLoading.value = true;
      const arlModel = new ArlModel();
      await arlModel.create(data.nameArl);
      await fetchArl();
      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.create"),
        type: "success",
      });
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const deleteArlRequest = async (id: number) => {
    try {
      isLoading.value = true;
      const arlModel = new ArlModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await arlModel.delete(id, userId);
      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.delete"),
        type: "success",
      });
      await fetchArl();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const updateArlRequest = async (id: number, nameArl: string) => {
    try {
      isLoading.value = true;
      const arlModel = new ArlModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await arlModel.update(id, nameArl, userId);
      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.update"),
        type: "success",
      });
      await fetchArl();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  return {
    isLoading,
    fetchArl,
    createArlRequest,
    deleteArlRequest,
    updateArlRequest,
  };
});