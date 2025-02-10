import { JobTitleModel } from "@/database/jobTitle/jobTitle.model";
import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import { defineStore } from "pinia";

export const useJobTitleStore = defineStore("jobTitle", () => {
  const fetchJobTitles = async () => {
    const result = {
      loading: true,
      jobTitleList: [] as JobTitle[],
    };

    try {
      result.loading = true;
      const jobTitleModel = new JobTitleModel();
      const response: JobTitle[] = await jobTitleModel.getJobTitles();
      result.jobTitleList = response;
    } catch (error) {
      console.error("Error fetching job titles:", error);
      result.jobTitleList = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchJobTitles
  }
});
