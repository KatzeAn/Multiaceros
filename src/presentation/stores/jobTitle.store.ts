import { defineStore } from "pinia";
import {  ref } from "vue";
import { JobTitleModel } from "@/database/jobTitle/jobTitle.model";
import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import { ElNotification } from "element-plus";
import { useUserStore } from "./user.store";

export const useJobTitleStore = defineStore("jobTitle", () => {
  const jobTitles = ref<JobTitle[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchJobTitles = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();
      const data = await jobTitleModel.getJobTitles(isActive);
      jobTitles.value = Array.isArray(data) ? [...data] : [];
      return jobTitles.value;
    } catch (error) {
      console.error(error);
      jobTitles.value = [];
      ElNotification({
        title: "Error",
        message: "No se pudieron cargar los cargos",
        type: "error",
      });
      return [];
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
    } catch (error: any) {
          errorMessage.value = error as string;
          ElNotification({
              title: 'Error',
              message: errorMessage.value,
              type: 'error',
          });
      }
  };

  const deleteJobTitleRequest = async (jobTitleId: number) => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();

      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await jobTitleModel.deleteJobTitle(jobTitleId, userId);

      ElNotification ({
        title: "Exito",
        message: "Cargo eliminado con exito",
        type: "success",
        });
        await fetchJobTitles();
        } catch (error: any) {
              errorMessage.value = error as string;
              ElNotification({
                  title: 'Error',
                  message: errorMessage.value,
                  type: 'error',
              });
          }
}

          const updateJobTitleRequest = async (id: number, newName: string) => {
            try {
              isLoading.value = true;
              const jobTitleModel = new JobTitleModel();
              const userStore = useUserStore(); 
              const userId = userStore.getUserId;
          
              await jobTitleModel.updateJobTitle(id, newName, userId);
          
              ElNotification({
                title: "Éxito",
                message: "Cargo actualizado con éxito",
                type: "success",
              });
          
              await fetchJobTitles(); 
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
    fetchJobTitles,
    createJobTitleRequest,
    deleteJobTitleRequest,
    updateJobTitleRequest,
  };
});
