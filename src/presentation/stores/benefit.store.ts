import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { BenefitModel } from "@/database/benefits/benefit.model";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";

export const useBenefitStore = defineStore("Benefit", () => {
  const isLoading = ref(false);

  const fetchBenefit = async () => {
    try {
      isLoading.value = true;
      const benefitModel = new BenefitModel();
      const data = await benefitModel.getBenefits();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los beneficios",
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createBenefitRequest = async (data: Benefits) => {
    try {
      isLoading.value = true;
      const benefitModel = new BenefitModel();
      await benefitModel.createBenefit(data);
      await fetchBenefit(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetchBenefit,
    createBenefitRequest,
  };
});
