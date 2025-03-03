import { defineStore } from "pinia";
import { ref } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { JobPostingModel } from "@/database/jobPostings/jobPostings.model";
import { ElNotification } from "element-plus";
import { useUserStore } from "./user.store";

const jobPostingModel = new JobPostingModel();
const isLoading = ref(false);

export const useJobPostingStore = defineStore("jobPosting", () => {
  const jobPostings = ref<JobPosting[]>([]);
  
  const fetchJobPostingsCopy = async (deactivate: boolean = false) => {
    try {
      isLoading.value = true;
      const data = await jobPostingModel.getAllJobPostingsCopy(deactivate);
      jobPostings.value = Array.isArray(data) ? [...data] : [];
    } catch (error) {
      jobPostings.value = []; 
    } finally {
      isLoading.value = false;
    }
  };
  
  const createJobPosting = async (job: JobPosting) => {
    try {
      const newJob = await jobPostingModel.createJobPosting(job);
      jobPostings.value.push(newJob);
      return newJob;
    } catch (error) {
      console.error("Error creating job posting:", error);
      throw error;
    }
  };

  const updateJobPosting = async (id: number, job: JobPosting) => {
    try {
      isLoading.value = true;
      await jobPostingModel.updateJobPosting(id, job);

      ElNotification({
        title: "Éxito",
        message: "Oferta de trabajo actualizada correctamente",
        type: "success",
      });
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudo actualizar la oferta de trabajo",
        type: "error",
      });
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteJobPosting = async (id: number) => {
    try {
      isLoading.value = true;
      const userStore = useUserStore();
      const userId = userStore.getUserId;

      await jobPostingModel.deleteJobPosting(id, userId);

      ElNotification({
        title: "Éxito",
        message: "Oferta de trabajo eliminada con éxito",
        type: "success",
      });

      await fetchJobPostingsCopy();
    } catch (error) {
      ElNotification({
        title: "Error",
        message: "No se pudo eliminar la oferta de trabajo",
        type: "error",
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    jobPostings,
    createJobPosting,
    fetchJobPostingsCopy,
    updateJobPosting,
    deleteJobPosting
  };
});
