import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { BenefitModel } from "@/database/benefits/benefit.model";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";
import { useUserStore } from "./user.store";

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

  const deleteBenefitRequest = async (benefitID: number) => {
    try {
      isLoading.value = true;
      const benefitModel = new BenefitModel();

      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await benefitModel.deleteBenefit(benefitID, userId);

      ElNotification ({
        title: "Exito",
        message: "Beneficio eliminado con exito",
        type: "success",
        });
        await fetchBenefit();
        } catch (error) {
          ElNotification({
            title: "Error",
            message: "No se pudo eliminar el beneficio",
            type: "error",
            });
            } finally {
              isLoading.value = false;
              }
              
  }

  const updateBenefitRequest = async (id: number, nameBenefit: string) => {
    try {
      isLoading.value = true;
      const benefitModel = new BenefitModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;
  
      await benefitModel.updateBenefit(id, nameBenefit, userId);
  
      ElNotification({
        title: "Éxito",
        message: "Beneficio actualizado con éxito.",
        type: "success",
      });
  
      await fetchBenefit();
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudo actualizar el beneficio.",
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };
  

  return {
    isLoading,
    fetchBenefit,
    createBenefitRequest,
    deleteBenefitRequest,
    updateBenefitRequest,
  };
});
