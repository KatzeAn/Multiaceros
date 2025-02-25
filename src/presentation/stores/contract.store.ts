import { ContractModel } from "@/database/contract/contract.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useContractDaysStore = defineStore("contractDays", () => {
  const loading = ref(false);

  const fetchContractsByDaysRemaining = async (daysRemaining: number) => {
    loading.value = true;
    try {
      const contractTypeModel = new ContractModel();
      return await contractTypeModel.getContractsByDaysRemaining(daysRemaining);
    } catch (error) {
      console.error("Error fetching contracts by days remaining:", error);
      return [];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    fetchContractsByDaysRemaining,
  };
});
