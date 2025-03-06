import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { PensionFundsModel } from "@/database/pensionFunds/pensionFunds.model";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";
import { useUserStore } from "./user.store";

export const usePensionFundStore = defineStore("pensionFund", () => {
  const pensionFunds = ref<PensionFunds[]>([]);
  const isLoading = ref(false);

  const fetchPensionFund = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      const data = await pensionFundModel.getPensionFunds(isActive);
      pensionFunds.value = Array.isArray(data) ? [...data] : [];
      return pensionFunds.value;
    } catch (error) {
      console.error(error);
      pensionFunds.value = [];
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los fondos de pensión",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createPensionFundRequest = async (data: PensionFunds) => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      await pensionFundModel.createPensionFund(data);
      await fetchPensionFund(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const deletePensionFundRequest = async (pensionFundId: number) => {
    try {
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();

      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await pensionFundModel.deletePensionFund(pensionFundId, userId);

      ElNotification({
        title: "Éxito",
        message: "Fondo de pensión eliminado correctamente",
        type: "success",
      });

      await fetchPensionFund();
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudo eliminar el fondo de pensión",
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const updatePensionFundRequest = async (id: number, pensionFundName: string) => {
    try{
      isLoading.value = true;
      const pensionFundModel = new PensionFundsModel();
      const userStore = useUserStore(); 
      const userId = userStore.getUserId;

      await pensionFundModel.updatePensionFund(id, pensionFundName, userId);

      ElNotification({
        title: "Éxito",
        message: "Fondo de pensión actualizado correctamente",
        type: "success",
        });

        await fetchPensionFund();
        } catch (error) {
          ElNotification({
            title: "Error",
            message: "No se pudo actualizar el fondo de pensión",
            type: "error",
      });
    } finally {
      isLoading.value = false;
      }
  }
  return {
    isLoading,
    fetchPensionFund,
    createPensionFundRequest,
    deletePensionFundRequest,
    updatePensionFundRequest,
  };
});
