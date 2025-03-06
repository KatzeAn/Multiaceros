import { ContractModel } from "@/database/contract/contract.model";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useContracTypeStore = defineStore("contractType", () => {
  const contractTypeList = ref<ContractType[]>([]);
  const loading = ref(false);

  const fetchContractType = async (isActive: boolean = false) => {
    loading.value = true;
    try {
      const contractTypeModel = new ContractModel();
      const response: ContractType[] = await contractTypeModel.getContracts(isActive);
      contractTypeList.value = Array.isArray(response) ? [...response] : [];
    } catch (error) {
      console.error("Error fetching contract types:", error);
      contractTypeList.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    contractTypeList,
    loading,
    fetchContractType,
  };
});
