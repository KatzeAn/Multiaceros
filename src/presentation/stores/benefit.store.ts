import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { BenefitModel } from "@/database/benefits/benefit.model";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";
import { useUserStore } from "./user.store";

export const useBenefitStore = defineStore("Benefit", () => {
  const benefits = ref<Benefits[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);
  
  const fetchBenefit = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const benefitModel = new BenefitModel();
      const data = await benefitModel.getBenefits(isActive);
      benefits.value = Array.isArray(data) ? [...data] : [];
      return benefits.value; 
    } catch (error) {
      console.error("Error al obtener los beneficios:", error);
      benefits.value = [];
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
      ElNotification({
        title: "Éxito",
        message: "Beneficio creado con éxito",
        type: "success",
      });
      await fetchBenefit();
     } catch (error: any) {
            errorMessage.value = error as string;
            ElNotification({
                title: 'Error',
                message: errorMessage.value,
                type: 'error',
            });
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
      } catch (error: any) {
        errorMessage.value = error as string;
        ElNotification({
            title: 'Error',
            message: errorMessage.value,
            type: 'error',
        });
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
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
          title: 'Error',
          message: errorMessage.value,
          type: 'error',
      });
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
