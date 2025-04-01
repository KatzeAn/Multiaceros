import { ref, onMounted } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { useJobPostingStore } from "../stores/jobPostings.store";

export function useJobPostingViewModel() {
  const jobPostingStore = useJobPostingStore();
  const jobPostingList = ref<JobPosting[]>([]); 

  const isLoading = ref(false);

  const loadJobPosting = async () => {
    isLoading.value = true;
    jobPostingList.value = await jobPostingStore.fetchJobPostingsCopy();
    isLoading.value = false;
  };

  onMounted(async () => {
    await loadJobPosting();
  });

  return {
    jobPostingList,
    isLoading,
  };
}
