import { ContractModel } from "@/database/contract/contract.model";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";
import { defineStore } from "pinia";

export const useContracTypeStore = defineStore("contractType", () => {
  const fetchContractType = async () => {
    const result = {
      loading: true,
      contractTypeList: [] as ContractType[],
    };

    try {
      result.loading = true;
      const contractTypeModel = new ContractModel();
      const response: ContractType[] = await contractTypeModel.getContracts();
      result.contractTypeList = response;
    } catch (error) {
      console.error("Error fetching contract types:", error);
      result.contractTypeList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchContractType,
  };
});
