import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { JobTitleModel } from "@/database/jobTitle/jobTitle.model";
import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import { ElNotification } from "element-plus";

export const useJobTitleStore = defineStore("jobTitle", () => {
  const isLoading = ref(false);

  const fetchJobTitles = async () => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();
      return await jobTitleModel.getJobTitles();
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los cargos",
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  const createJobTitleRequest = async (jobTitle: JobTitle) => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();
      await jobTitleModel.createJobTitle(jobTitle);
      await fetchJobTitles(); // Recargar lista después de crear
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    fetchJobTitles,
    createJobTitleRequest,
  };
});
