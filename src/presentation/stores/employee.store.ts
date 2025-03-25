import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { EmployeeModel } from "@/database/employee/employee.model";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";
import { useUserStore } from "@/presentation/stores/user.store";

export const useEmployeeStore = defineStore("employee", () => {
  const { t } = useI18n(); 
  const isLoading = ref(false);
  const errorMessage = ref<string | null | undefined>(null);

  const fetchEmployee = async () => {
    try {
      isLoading.value = true;
      const employeeModel = new EmployeeModel();
      const data = await employeeModel.getEmployees();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      ElNotification({
        title: t("notifications.error.title"),
        message: t("notifications.error.employeeLoad"),
        type: "error",
      });
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const createEmployeeRequest = async (data: EmployeeRequest) => {
    try {
      isLoading.value = true;
      const employeeModel = new EmployeeModel();
      await employeeModel.createEmployee(data);
      
      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.employeeCreated"),
        type: "success",
      });

      await fetchEmployee(); // Recargar lista después de crear
    } catch (error: any) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };

  const deactivateEmployee = async (id: number) => {
    try {
      isLoading.value = true;
      const employeeModel = new EmployeeModel();
      const userStore = useUserStore();
      const userId = userStore.getUserId;
      
      await employeeModel.deleteEmployee(id, userId);
      
      ElNotification({
        title: t("notifications.success.title"),
        message: t("notifications.success.employeeDeactivated"),
        type: "success",
      });

      await fetchEmployee();
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
    fetchEmployee,
    createEmployeeRequest,
    deactivateEmployee,
  };
});
