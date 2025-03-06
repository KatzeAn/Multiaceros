import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { SeveranceFundModel } from "@/database/severanceFund/severanceFund.model";
import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";
import { useUserStore } from "./user.store";

export const useSeveranceFundStore = defineStore("severanceFund", () => {
  const severanceFunds = ref<SeveranceFund[]>([]);
  const isLoading = ref(false);

  const fetchSeveranceFund = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const severanceFundModel = new SeveranceFundModel();
      const data = await severanceFundModel.getSeveranceFund(isActive);
      severanceFunds.value = Array.isArray(data) ? [...data] : [];
      return severanceFunds.value;
    } catch (error) {
      console.error(error);
      severanceFunds.value = [];
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

          const updateSeveranceFundRequest = async (id: number, severanceFundName: string) => {
            try {
              isLoading.value = true;
              const severanceFundModel = new SeveranceFundModel();
              const userStore = useUserStore(); 
              const userId = userStore.getUserId;
        
              await severanceFundModel.updateSeveranceFund(id, severanceFundName, userId);

              ElNotification({
                title: "Exito",
                message: "Fondo de cesantias actualizado con éxito",
                type: "success",
                });

                await fetchSeveranceFund();
                } catch (error) {
                  ElNotification({
                    title: "Error",
                    message: "No se pudo actualizar el fondo de compensación familiar",
                    type: "error",
              });
          } finally {
            isLoading.value = false;
          }
        };

  return {
    isLoading,
    fetchSeveranceFund,
    createSeveranceFundRequest,
    deleteSeveranceFundsRequest,
    updateSeveranceFundRequest,
  };
});
