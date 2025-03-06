import { BloodTypeModel } from "@/database/bloodType/bloodType.model";
import type { BloodType } from "@/domain/Interfaces/BloodType/bloodType.interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBloodTypeStore = defineStore("bloodType", () => {
  const bloodTypeList = ref<BloodType[]>([]);
  const isLoading = ref(false);
  const bloodTypeModel = new BloodTypeModel();

  const fetchBloodType = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const response: BloodType[] = await bloodTypeModel.getBloodTypes(isActive);
      bloodTypeList.value = Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Error fetching blood types:", error);
      bloodTypeList.value = [];
    } finally {
      isLoading.value = false;
    }

  };

  return {
    fetchBloodType,
    bloodTypeList,
    isLoading,   
  };
});
