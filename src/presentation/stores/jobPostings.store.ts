import { defineStore } from "pinia";
import { ref } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { JobPostingModel } from "@/database/jobPostings/jobPostings.model";
import { ElNotification } from "element-plus";
import { useUserStore } from "./user.store";

const jobPostingModel = new JobPostingModel();
const isLoading = ref(false);
const errorMessage = ref<string | null | undefined>(null);

export const useJobPostingStore = defineStore("jobPosting", () => {
  const jobPostings = ref<JobPosting[]>([]);
  
  const fetchJobPostingsCopy = async (deactivate: boolean = false) => {
    try {
      isLoading.value = true;
      const data = await jobPostingModel.getAllJobPostingsCopy(deactivate);
      jobPostings.value = Array.isArray(data) ? [...data] : [];
      return jobPostings.value; // <-- Agregar esto para devolver los datos
    } catch (error) {
      jobPostings.value = []; 
      return []; // <-- También retornar array vacío en caso de error
    } finally {
      isLoading.value = false;
    }
  };
  
  
  const createJobPosting = async (job: JobPosting) => {
    try {
      const newJob = await jobPostingModel.createJobPosting(job);
      jobPostings.value.push(newJob);
      return newJob;
    } catch (error: any) {
                errorMessage.value = error as string;
                ElNotification({
                    title: 'Error',
                    message: errorMessage.value,
                    type: 'error',
                });
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
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
          title: 'Error',
          message: errorMessage.value,
          type: 'error',
      });
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
    jobPostings,
    createJobPosting,
    fetchJobPostingsCopy,
    updateJobPosting,
    deleteJobPosting
  };
});
