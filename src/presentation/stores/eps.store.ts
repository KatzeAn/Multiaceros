import { EpsModel } from "@/database/eps/eps.model";
import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";
import { defineStore } from "pinia";

export const useEpsStore = defineStore("eps", () => {
  const fetchEps = async () => {
    const result = {
      loading: true,
      epsList: [] as Eps[],
    };

    try {
      result.loading = true;
      const epsModel = new EpsModel();
      const response: Eps[] = await epsModel.getEps();
      result.epsList = response;
    } catch (error) {
      console.error("Error fetching eps:", error);
      result.epsList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchEps,
  };
});
