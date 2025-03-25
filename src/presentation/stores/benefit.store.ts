import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { BenefitModel } from "@/database/benefits/benefit.model";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";
import { useUserStore } from "./user.store";
import { useI18n } from "vue-i18n"; 

export const useBenefitStore = defineStore("Benefit", () => {
  const { t } = useI18n();
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
      console.error(t("notifications.error.benefitLoad"), error);
      benefits.value = [];
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.benefitLoad"),
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
        title: t("notifications.success.title"),
        message: t("notifications.success.benefitCreated"),
        type: "success",
      });
      await fetchBenefit();
     } catch (error: any) {
            errorMessage.value = error as string;
            ElNotification({
                title: t("notifications.error.title"),
                message: errorMessage.value,
                type: "error",
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

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.benefitDeleted"),
        type: "success",
      });
      await fetchBenefit();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const updateBenefitRequest = async (id: number, nameBenefit: string) => {
    try {
      isLoading.value = true;
      const benefitModel = new BenefitModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;
  
      await benefitModel.updateBenefit(id, nameBenefit, userId);
  
      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.benefitUpdated"),
        type: "success",
      });
      await fetchBenefit();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
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
