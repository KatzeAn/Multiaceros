import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { JobPostingModel } from "@/database/jobPostings/jobPostings.model";
import { ElNotification } from "element-plus";
import { useUserStore } from "./user.store";

export const useJobPostingStore = defineStore("jobPosting", () => {
  const { t } = useI18n();
  const jobPostings = ref<JobPosting[]>([]);
  const jobPostingModel = new JobPostingModel();
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchJobPostingsCopy = async (deactivate: boolean = false) => {
    try {
      isLoading.value = true;
      const data = await jobPostingModel.getAllJobPostingsCopy(deactivate);
      jobPostings.value = Array.isArray(data) ? [...data] : [];
      return jobPostings.value;
    } catch (error) {
      jobPostings.value = [];
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createJobPosting = async (job: JobPosting) => {
    try {
      const newJob = await jobPostingModel.createJobPosting(job);
      jobPostings.value.push(newJob);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.jobCreated"),
        type: "success",
      });

      return newJob;
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const updateJobPosting = async (id: number, job: JobPosting) => {
    try {
      isLoading.value = true;
      await jobPostingModel.updateJobPosting(id, job);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.jobUpdated"),
        type: "success",
      });
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
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
        title: t("notifications.success.title"),
        message: t("notifications.success.jobDeleted"),
        type: "success",
      });

      await fetchJobPostingsCopy();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  return {
    jobPostings,
    createJobPosting,
    fetchJobPostingsCopy,
    updateJobPosting,
    deleteJobPosting,
  };
});
