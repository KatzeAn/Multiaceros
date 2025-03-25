import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { EmployeePotentialModel } from "@/database/employeePotential/employeePotential.model";
import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";

export const useEmployeePotentialStore = defineStore(
  "employeePotential",
  () => {
    const isLoading = ref(false);
    const errorMessage = ref<string | null | undefined>(null);
    const { t } = useI18n();

    const fetchEmployeePotential = async () => {
      try {
        isLoading.value = true;
        const employeePotentialModel = new EmployeePotentialModel();
        const data = await employeePotentialModel.getAllEmployeesPotential();
        return Array.isArray(data) ? data : [];
      } catch (error) {
        ElNotification({
          title: t("notifications.error.title"),
          message: t("notifications.error.employeePotentialLoad"),
          type: "error",
        });
        return [];
      } finally {
        isLoading.value = false;
      }
    };

    const fetchEmployeePotentialByDocument = async (numberDocument: number) => {
      try {
        isLoading.value = true;
        const employeePotentialModel = new EmployeePotentialModel();
        const data = await employeePotentialModel.getEmployeePotentialByDocument(numberDocument);
        return data;
      } catch (error) {
        ElNotification({
          title: t("notifications.error.title"),
          message: t("notifications.error.candidateLoad"),
          type: "error",
        });
        return null;
      } finally {
        isLoading.value = false;
      }
    };

    const createEmployeePotentialRequest = async (data: EmployeePotential, file: File) => {
      try {
        isLoading.value = true;
        const employeePotentialModel = new EmployeePotentialModel();
        await employeePotentialModel.createEmployeePotential(data, file);
        ElNotification({
          title: t("notifications.success.title"),
          message: t("notifications.success.requestSent"),
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

    return {
      isLoading,
      fetchEmployeePotential,
      createEmployeePotentialRequest,
      fetchEmployeePotentialByDocument,
    };
  }
);