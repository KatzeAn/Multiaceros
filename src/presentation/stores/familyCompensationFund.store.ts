import { FamilyCompesationFundsModel } from "@/database/familyCompesationFunds/familyCompesationFunds.model";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";
import { defineStore } from "pinia";

export const useFamilyCompensationFund = defineStore("familyCompensationFund", () => {
  const fetchFamilyCompensationFund = async () => {
    const result = {
      loading: true,
      familyCompensationFundList: [] as FamilyCompesationFunds[],
    };

    try {
      result.loading = true;
      const familyCompesationFundModel = new FamilyCompesationFundsModel();
      const response: FamilyCompesationFunds[] = await familyCompesationFundModel.getFamilyCompesationFunds();
      result.familyCompensationFundList = response;
    } catch (error) {
      console.error("Error fetching arl:", error);
      result.familyCompensationFundList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchFamilyCompensationFund,
  };
});
