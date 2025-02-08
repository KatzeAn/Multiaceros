import { BloodTypeModel } from "@/database/bloodType/bloodType.model";
import type { BloodType } from "@/domain/Interfaces/BloodType/bloodType.interface";
import { defineStore } from "pinia";

export const useBloodTypeStore = defineStore("bloodType", () => {
  const fetchBloodType = async () => {
    const result = {
      loading: true,
      bloodTypeList: [] as BloodType[],
    };

    try {
      result.loading = true;
      const bloodTypeModel = new BloodTypeModel();
      const response: BloodType[] = await bloodTypeModel.getBloodTypes();
      result.bloodTypeList = response;
    } catch (error) {
      console.error("Error fetching blood types:", error);
      result.bloodTypeList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchBloodType,
  };
});
