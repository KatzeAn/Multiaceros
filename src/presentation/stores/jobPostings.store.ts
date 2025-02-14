import { defineStore } from "pinia";
import { ref } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { JobPostingModel } from "@/database/jobPostings/jobPostings.model";

const jobPostingModel = new JobPostingModel();

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

  return { jobPostings, fetchJobPostings, createJobPosting };
});

