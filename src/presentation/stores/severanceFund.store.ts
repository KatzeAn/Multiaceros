import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { SeveranceFundModel } from "@/database/severanceFund/severanceFund.model";
import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";
import { useUserStore } from "./user.store";
import { useI18n } from "vue-i18n";

export const useSeveranceFundStore = defineStore("severanceFund", () => {
  const { t } = useI18n();
  const severanceFunds = ref<SeveranceFund[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchSeveranceFund = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const severanceFundModel = new SeveranceFundModel();
      const data = await severanceFundModel.getSeveranceFund(isActive);
      severanceFunds.value = Array.isArray(data) ? [...data] : [];
      return severanceFunds.value;
    } catch (error) {
      console.error(error);
      severanceFunds.value = [];
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.severanceFundFetch"),
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createSeveranceFundRequest = async (data: SeveranceFund) => {
    try {
      isLoading.value = true;
      const severanceFundModel = new SeveranceFundModel();
      await severanceFundModel.createSeveranceFund(data);
      await fetchSeveranceFund(); // Recargar lista después de crear
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const deleteSeveranceFundsRequest = async (severanceFundId: number) => {
    try {
      isLoading.value = true;
      const severanceFundModel = new SeveranceFundModel();

      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await severanceFundModel.deleteSeveranceFund(severanceFundId, userId);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.severanceFundDeleted"),
        type: "success",
      });

      await fetchSeveranceFund();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const updateSeveranceFundRequest = async (id: number, severanceFundName: string) => {
    try {
      isLoading.value = true;
      const severanceFundModel = new SeveranceFundModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;

      await severanceFundModel.updateSeveranceFund(id, severanceFundName, userId);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.severanceFundUpdated"),
        type: "success",
      });

      await fetchSeveranceFund();
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
    fetchSeveranceFund,
    createSeveranceFundRequest,
    deleteSeveranceFundsRequest,
    updateSeveranceFundRequest,
  };
});
