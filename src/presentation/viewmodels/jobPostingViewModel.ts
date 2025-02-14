import { ref, computed, onMounted } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { useJobPostingStore } from "../stores/jobPostings.store";

export function useJobPostingViewModel() {
  const jobPostingStore = useJobPostingStore();
  const jobPostingList = ref<JobPosting[]>([]);
  const isLoading = computed(() => jobPostingStore);

  const loadJobPosting = async () => {
    jobPostingList.value = (await jobPostingStore.fetchJobPostingsCopy()) || [];
  };

  onMounted(async () => {
    await loadJobPosting();
  });

  return {
    jobPostingList,
    isLoading,
  };
}
