import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { PensionFundsModel } from "@/database/pensionFunds/pensionFunds.model";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";

export const usePensionFundStore = defineStore("pensionFund", () => {
  const isLoading = ref(false);

  const fetchPensionFund = async () => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      const data = await pensionFundModel.getPensionFunds();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los fondos de pensión",
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
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetchPensionFund,
    createPensionFundRequest,
  };
});
