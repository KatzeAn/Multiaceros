import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { FamilyCompesationFundsModel } from "@/database/familyCompesationFunds/familyCompesationFunds.model";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";

export const useFamilyCompensationFundStore = defineStore(
  "familyCompensationFund",
  () => {
    const isLoading = ref(false);

    const fetchFamilyCompensationFund = async () => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();
        const data =
          await familyCompensationFundModel.getFamilyCompesationFunds();
        return Array.isArray(data) ? data : [];
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "No se pudieron cargar los fondos de compensación familiar",
          type: "error",
        });
        return [];
      } finally {
        isLoading.value = false;
      }
    };

    const createFamilyCompensationFundRequest = async (
      data: FamilyCompesationFunds
    ) => {
      try {
        isLoading.value = true;
        const familyCompensationFundModel = new FamilyCompesationFundsModel();
        await familyCompensationFundModel.createFamilyCompesationFunds(data);
        await fetchFamilyCompensationFund(); // Recargar lista después de crear
      } catch (error) {
        throw error;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      fetchFamilyCompensationFund,
      createFamilyCompensationFundRequest,
    };
  }
);
