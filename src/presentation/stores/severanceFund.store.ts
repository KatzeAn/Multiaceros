import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { SeveranceFundModel } from "@/database/severanceFund/severanceFund.model";
import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";
import { useUserStore } from "./user.store";

export const useSeveranceFundStore = defineStore("severanceFund", () => {
  const isLoading = ref(false);

  const fetchSeveranceFund = async () => {
    try {
      isLoading.value = true;
      const severanceFundModel = new SeveranceFundModel();
      const data = await severanceFundModel.getSeveranceFund();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los fondos de cesantías",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createSeveranceFundRequest = async (data: SeveranceFund) => {
    try {
      isLoading.value = true;
      const severanceFundModel = new SeveranceFundModel();
      await severanceFundModel.createSeveranceFund(data);
      await fetchSeveranceFund(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteSeveranceFundsRequest = async (severanceFundId: number) => {
        try {
          isLoading.value = true;
          const severanceFundModel = new SeveranceFundModel();

          const userStore = useUserStore();
          const userId = userStore.getUserId;
          await severanceFundModel.deleteSeveranceFund(severanceFundId, userId);

          ElNotification ({
            title: "Exito",
            message: "Fondo de cesantias eliminado con éxito",
            type: "success",
            });

            await fetchSeveranceFund();
            } catch (error) {
              ElNotification ({
                title: "Error",
                message: "No se pudo eliminar el fondo de compensación familiar",
                type: "error",
                });
              }finally {
                isLoading.value = false;
              }
          
          }

  return {
    isLoading,
    fetchSeveranceFund,
    createSeveranceFundRequest,
    deleteSeveranceFundsRequest,
  };
});
