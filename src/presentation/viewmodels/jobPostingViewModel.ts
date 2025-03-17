import {  computed, onMounted } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { useJobPostingStore } from "../stores/jobPostings.store";

export function useJobPostingViewModel() {
  const jobPostingStore = useJobPostingStore();
  const jobPostingList = computed(() => jobPostingStore.jobPostings);
  const isLoading = computed(() => jobPostingStore);
  
  const loadJobPosting = async () => {
    const data = await jobPostingStore.fetchJobPostingsCopy();
    jobPostingList.value = [];
  };
  
  onMounted(async () => {
    await loadJobPosting();
  });

  return {
    jobPostingList,
    isLoading,
  };
}
