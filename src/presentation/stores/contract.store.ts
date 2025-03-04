import { ContractModel } from "@/database/contract/contract.model";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Contract } from "@/domain/Interfaces/Contract/contract.interface";
import { ElNotification } from "element-plus";

export const useContractDaysStore = defineStore("contractDays", () => {
  const loading = ref(false);

  const fetchContractsByDaysRemaining = async (daysRemaining: number) => {
    loading.value = true;
    try {
      const contractTypeModel = new ContractModel();
      return await contractTypeModel.getContractsByDaysRemaining(daysRemaining);
    } catch (error) {
      console.error("Error fetching contracts by days remaining:", error);
      return [];
    } finally {
      loading.value = false;
    }
  };


const updateContract = async (id: number, contract: Contract) => {
  loading.value = true;
  try {
    const contractTypeModel = new ContractModel();
    await contractTypeModel.updateContract(id, contract);

    ElNotification({
      title: "Éxito",
      message: "El contrato ha sido actualizado correctamente.",
      type: "success",
    });

    return true;
  } catch (error) {
    console.error("Error updating contract:", error);

    ElNotification({
      title: "Error",
      message: "Hubo un problema al actualizar el contrato.",
      type: "error",
    });

    return false;
  } finally {
    loading.value = false;
  }
};


  return {
    loading,
    fetchContractsByDaysRemaining,
    updateContract,
  };
});
