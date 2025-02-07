import { defineStore } from "pinia";
import { ref } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { apiRequest } from "../api/axiosInstance";

export const useJobPostingStore = defineStore("jobPosting", () => {
  const jobPostings = ref<JobPosting[]>([]);

  const fetchJobPostings = async () => {
    try {
      const response = await apiRequest<{ message: string; data: JobPosting[] }>(
        "get",
        "/JobPostings/GetAllJobPostings"
      );
      console.log("Respuesta de la API en el Store:", response);
      jobPostings.value = response.data; // 👈 Aquí extraemos solo el array
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };
  

  return { jobPostings, fetchJobPostings };
});
