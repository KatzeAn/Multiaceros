import { defineStore } from "pinia";
import { ref } from "vue";
import { RoleModel } from "@/database/role/role.model";
import type { Role } from "@/domain/Interfaces/role/role.interface";
import type { RoleRequest } from "@/domain/Interfaces/role/roleRequest.interface";
import { ElNotification } from "element-plus";

export const useRoleStore = defineStore("role", () => {
    const roles = ref<Role[]>([]);
    const isLoading = ref(false);
    const roleModel = new RoleModel();

    const fetchRoles = async (isActive: boolean = false) => {
        try {
            isLoading.value = true;
            const response = await roleModel.getRoles(isActive);
            roles.value = Array.isArray(response) ? [...response] : [];
        } catch (error) {
            console.error("Error al obtener roles:", error);
            roles.value = [];
        } finally {
            isLoading.value = false;
        }
    };

const assignUserRole = async (userId: number, roleData: RoleRequest) => {
    try {
        const response = await roleModel.assignRole(userId, roleData);
        ElNotification({
            title: "Éxito",
            message: "El rol se ha cambiado exitosamente.",
            type: "success",
        });
        return response;
    } catch (error) {
        ElNotification({
            title: "Error",
            message: "Hubo un problema al cambiar el rol.",
            type: "error",
        });
        throw error;
    }
};


    return {
        roles,
        fetchRoles,
        assignUserRole,
    };
});
