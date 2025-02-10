import { ArlModel } from "@/database/arl/arl.model";
import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";
import { defineStore } from "pinia";

export const useArlStore = defineStore("arl", () => {
  const fetchArl = async () => {
    const result = {
      loading: true,
      arlList: [] as Arl[],
    };

    try {
      result.loading = true;
      const arlModel = new ArlModel();
      const response: Arl[] = await arlModel.getAll();
      result.arlList = response;
    } catch (error) {
      console.error("Error fetching arl:", error);
      result.arlList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchArl,
  };
});
