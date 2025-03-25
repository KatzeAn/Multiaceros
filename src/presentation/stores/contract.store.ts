import { ContractModel } from "@/database/contract/contract.model";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Contract } from "@/domain/Interfaces/Contract/contract.interface";
import { ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";

export const useContractDaysStore = defineStore("contractDays", () => {
  const { t } = useI18n(); 
  const loading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchContractsByDaysRemaining = async (daysRemaining: number) => {
    loading.value = true;
    try {
      const contractTypeModel = new ContractModel();
      return await contractTypeModel.getContractsByDaysRemaining(daysRemaining);
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.contractLoad"),
        type: "error",
      });
    }
  };

  const updateContract = async (id: number, contract: Contract) => {
    loading.value = true;
    try {
      const contractTypeModel = new ContractModel();
      await contractTypeModel.updateContract(id, contract);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.contractUpdated"),
        type: "success",
      });

      return true;
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
    loading,
    fetchContractsByDaysRemaining,
    updateContract,
  };
});
