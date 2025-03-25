import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { FamilyCompesationFundsModel } from "@/database/familyCompesationFunds/familyCompesationFunds.model";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";
import { useUserStore } from "./user.store";

export const useFamilyCompensationFundStore = defineStore(
  "familyCompensationFund",
  () => {
    const { t } = useI18n();

    const familyCompensationFunds = ref<FamilyCompesationFunds[]>([]);
    const isLoading = ref(false);
    const errorMessage = ref<string | null | undefined>(null);

    const fetchFamilyCompensationFund = async (isActive: boolean = false) => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();
        const data = await familyCompensationFundModel.getFamilyCompesationFunds(isActive);
        familyCompensationFunds.value = Array.isArray(data) ? [...data] : [];
        return familyCompensationFunds.value;
      } catch (error) {
        console.error(error);
        familyCompensationFunds.value = [];
        ElNotification({
          title: t("notifications.error.title"),
          message: t("notifications.error.compensationFundLoad"),
          type: "error",
        });
        return [];
      } finally {
        isLoading.value = false;
      }
    };

    const createFamilyCompensationFundRequest = async (data: FamilyCompesationFunds) => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();
        await familyCompensationFundModel.createFamilyCompesationFunds(data);
        await fetchFamilyCompensationFund(); // Recargar lista después de crear

        ElNotification({
          title: t("notifications.success.title"),
          message: t("notifications.success.compensationFundCreated"),
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

    const deleteFamilyCompesationRequest = async (compesationfundsID: number) => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();
        const userStore = useUserStore();
        const userId = userStore.getUserId;
        await familyCompensationFundModel.deleteFamilyCompesationFunds(compesationfundsID, userId);

        ElNotification({
          title: t("notifications.success.title"),
          message: t("notifications.success.compensationFundDeleted"),
          type: "success",
        });

        await fetchFamilyCompensationFund();
      } catch (error: any) {
        errorMessage.value = error as string;
        ElNotification({
          title: t("notifications.error.title"),
          message: errorMessage.value,
          type: "error",
        });
      }
    };

    const updateFamilyCompensationFundsRequest = async (id: number, compensationFundName: string) => {
      try {
        isLoading.value = true;
        const familyCompensationModel = new FamilyCompesationFundsModel();
        const userStore = useUserStore();
        const userId = userStore.getUserId;

        await familyCompensationModel.updateFamilyCompensationFunds(id, compensationFundName, userId);

        ElNotification({
          title: t("notifications.success.title"),
          message: t("notifications.success.compensationFundUpdated"),
          type: "success",
        });

        await fetchFamilyCompensationFund();
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
      fetchFamilyCompensationFund,
      createFamilyCompensationFundRequest,
      deleteFamilyCompesationRequest,
      updateFamilyCompensationFundsRequest,
    };
  }
);

