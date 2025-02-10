import { PensionFundsModel } from "@/database/pensionFunds/pensionFunds.model";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";
import { defineStore } from "pinia";

export const usePensionFund = defineStore("pensionFund", () => {
  const fetchPensionFunds = async () => {
    const result = {
      loading: true,
      pensionFundList: [] as PensionFunds[],
    };

    try {
      result.loading = true;
      const pensionFundModel = new PensionFundsModel();
      const response: PensionFunds[] = await pensionFundModel.getPensionFunds();
      result.pensionFundList = response;
    } catch (error) {
      console.error("Error fetching pension funds:", error);
      result.pensionFundList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchPensionFunds,
  };
});
