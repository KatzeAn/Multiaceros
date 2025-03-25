import { defineStore } from "pinia";
import { ref } from "vue";
import { RoleModel } from "@/database/role/role.model";
import type { Role } from "@/domain/Interfaces/role/role.interface";
import type { RoleRequest } from "@/domain/Interfaces/role/roleRequest.interface";
import { ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";

export const useRoleStore = defineStore("role", () => {
    const { t } = useI18n();
    const roles = ref<Role[]>([]);
    const isLoading = ref(false);
    const roleModel = new RoleModel();
    const errorMessage = ref<string | null | undefined>(null);
    
    const fetchRoles = async (isActive: boolean = false) => {
        try {
            isLoading.value = true;
            const response = await roleModel.getRoles(isActive);
            roles.value = Array.isArray(response) ? [...response] : [];
        } catch (error) {
            console.error(t("notifications.error.roleFetch"), error);
            roles.value = [];
        } finally {
            isLoading.value = false;
        }
    };

    const assignUserRole = async (userId: number, roleData: RoleRequest) => {
        try {
            const response = await roleModel.assignRole(userId, roleData);
            ElNotification({
                title: t("notifications.success.title"),
                message: t("notifications.success.roleAssigned"),
                type: "success",
            });
            return response;
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
        roles,
        fetchRoles,
        assignUserRole,
    };
});
