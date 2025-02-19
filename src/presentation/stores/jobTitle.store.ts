import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { JobTitleModel } from "@/database/jobTitle/jobTitle.model";
import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import { ElNotification } from "element-plus";
import { useUserStore } from "./user.store";

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
        } catch (error) {
          ElNotification({
            title: "Error",
            message: "No se pudo eliminar el cargo",
            type: "error",
            });
            } finally {

            }
          }

  return {
    isLoading,
    fetchJobTitles,
    createJobTitleRequest,
    deleteJobTitleRequest
  };
});
