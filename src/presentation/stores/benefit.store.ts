import { BenefitModel } from "@/database/benefits/benefit.model";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";
import { defineStore } from "pinia";

export const useBenefitStore = defineStore("benefit", () => {
  const fetchBenefit = async () => {
    const result = {
      loading: true,
      benefitList: [] as Benefits[],
    };

    try {
      result.loading = true;
      const benefitModel = new BenefitModel();
      const response: Benefits[] = await benefitModel.getBenefits();
      result.benefitList = response;
    } catch (error) {
      console.error("Error fetching benefits:", error);
      result.benefitList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchBenefit,
  };
});
