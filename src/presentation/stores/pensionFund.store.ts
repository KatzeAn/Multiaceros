import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { PensionFundsModel } from "@/database/pensionFunds/pensionFunds.model";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";
import { useUserStore } from "./user.store";
import { useI18n } from "vue-i18n";

export const usePensionFundStore = defineStore("pensionFund", () => {
  const { t } = useI18n(); 
  const pensionFunds = ref<PensionFunds[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchPensionFund = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      const data = await pensionFundModel.getPensionFunds(isActive);
      pensionFunds.value = Array.isArray(data) ? [...data] : [];
      return pensionFunds.value;
    } catch (error) {
      console.error(error);
      pensionFunds.value = [];
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.pensionLoad"),
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createPensionFundRequest = async (data: PensionFunds) => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      await pensionFundModel.createPensionFund(data);
      await fetchPensionFund(); // Recargar lista después de crear
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const deletePensionFundRequest = async (pensionFundId: number) => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await pensionFundModel.deletePensionFund(pensionFundId, userId);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.pensionDeleted"),
        type: "success",
      });

      await fetchPensionFund();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const updatePensionFundRequest = async (id: number, pensionFundName: string) => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;

      await pensionFundModel.updatePensionFund(id, pensionFundName, userId);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.pensionUpdated"),
        type: "success",
      });

      await fetchPensionFund();
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
    fetchPensionFund,
    createPensionFundRequest,
    deletePensionFundRequest,
    updatePensionFundRequest,
  };
});
