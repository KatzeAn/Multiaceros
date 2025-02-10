import { SeveranceFundModel } from "@/database/severanceFund/severanceFund.model";
import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";
import { defineStore } from "pinia";

export const useSeveranceFundStore = defineStore("severanceFund", () => {
  const fetchSeveranceFund = async () => {
    const result = {
      loading: true,
      severanceFundList: [] as SeveranceFund[],
    };

    try {
      result.loading = true;
      const severanceFundModel = new SeveranceFundModel();
      const response: SeveranceFund[] =
        await severanceFundModel.getSeveranceFund();
      result.severanceFundList = response;
    } catch (error) {
      console.error("Error fetching severance fund:", error);
      result.severanceFundList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchSeveranceFund,
  };
});
