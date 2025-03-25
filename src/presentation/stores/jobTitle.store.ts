import { defineStore } from "pinia";
import { ref } from "vue";
import { JobTitleModel } from "@/database/jobTitle/jobTitle.model";
import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import { ElNotification } from "element-plus";
import { useUserStore } from "./user.store";
import { useI18n } from "vue-i18n"; 

export const useJobTitleStore = defineStore("jobTitle", () => {
  const { t } = useI18n(); 

  const jobTitles = ref<JobTitle[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchJobTitles = async (isActive: boolean = false) => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();
      const data = await jobTitleModel.getJobTitles(isActive);
      jobTitles.value = Array.isArray(data) ? [...data] : [];
      return jobTitles.value;
    } catch (error) {
      console.error(error);
      jobTitles.value = [];
      ElNotification({
        title: t("notifications.error.title"), 
        message: t("notifications.error.jobTitleLoad"),
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createJobTitleRequest = async (jobTitle: JobTitle) => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();
      await jobTitleModel.createJobTitle(jobTitle);
      await fetchJobTitles();
      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.jobTitleCreated"),
        type: "success",
      });
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.jobTitleCreate"),
        type: "error",
      });
    }
  };

  const deleteJobTitleRequest = async (jobTitleId: number) => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;
      await jobTitleModel.deleteJobTitle(jobTitleId, userId);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.jobTitleDeleted"),
        type: "success",
      });

      await fetchJobTitles();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.jobTitleDelete"),
        type: "error",
      });
    }
  };

  const updateJobTitleRequest = async (id: number, newName: string) => {
    try {
      isLoading.value = true;
      const jobTitleModel = new JobTitleModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;

      await jobTitleModel.updateJobTitle(id, newName, userId);

      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.jobTitleUpdated"),
        type: "success",
      });

      await fetchJobTitles();
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.jobTitleUpdate"),
        type: "error",
      });
    }
  };

  return {
    isLoading,
    fetchJobTitles,
    createJobTitleRequest,
    deleteJobTitleRequest,
    updateJobTitleRequest,
  };
});
