import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { EpsModel } from "@/database/eps/eps.model";
import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";
import { ref } from "vue";

export const useEpsStore = defineStore("eps", () => {
  const isLoading = ref(false);

  const fetchEps = async () => {
    try {
      isLoading.value = true;
      const epsModel = new EpsModel();
      const data = await epsModel.getEps();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los EPS",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createEpsRequest = async (eps: Eps) => {
    try {
      isLoading.value = true;
      const epsModel = new EpsModel();
      await epsModel.createEps(eps);
      await fetchEps(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetchEps,
    createEpsRequest,
  };
});
