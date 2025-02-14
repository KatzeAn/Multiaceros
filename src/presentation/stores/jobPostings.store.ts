import { defineStore } from "pinia";
import { ref } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { JobPostingModel } from "@/database/jobPostings/jobPostings.model";
import { ElNotification } from "element-plus";

const jobPostingModel = new JobPostingModel();
const isLoading = ref(false);

export const useJobPostingStore = defineStore("jobPosting", () => {
  const jobPostings = ref<JobPosting[]>([]);

  const fetchJobPostings = async () => {
    try {
      const response = await jobPostingModel.getAllJobPostings();
      jobPostings.value = response.data;
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };

  const fetchJobPostingsCopy = async () => {
      try {
        isLoading.value = true;
        const data = await jobPostingModel.getAllJobPostingsCopy();
        return Array.isArray(data) ? data : [];
      } catch (error) {
        ElNotification({
          title: "Error",
          message: "No se pudieron cargar las vacantes",
          type: "error",
        });
        return [];
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

  return { jobPostings, fetchJobPostings, createJobPosting, fetchJobPostingsCopy };
});

