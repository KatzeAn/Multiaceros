import { defineStore } from "pinia";
import { ref } from "vue";
import { NotificationConfigModel } from "@/database/Notifications/Notifications.model";
import type { NotificationConfig } from "@/domain/Interfaces/Notifications/Notifications.interface";
import { ElNotification } from "element-plus";

export const useNotificationConfigStore = defineStore("notificationConfig", () => {
    const notificationConfigs = ref<NotificationConfig[]>([]);
    const isLoading = ref(false);

    const fetchNotificationConfigs = async (isActive: boolean) => {
        try {
            isLoading.value = true;
            const notificationConfigModel = new NotificationConfigModel();
            const data = await notificationConfigModel.getNotificationConfig(isActive);
            notificationConfigs.value = Array.isArray(data) ? [...data] : [];
            return notificationConfigs.value;
        } catch (error) {
            console.error(error);
            notificationConfigs.value = [];
            ElNotification({
                title: "Error",
                message: "No se pudieron cargar las  notificaciónes",
                type: "error",
            });
            return [];
        } finally {
            isLoading.value = false;
        }
    };

    const updateNotificationConfigRequest = async (id: number, data: Partial<NotificationConfig>) => {
        try {
            isLoading.value = true;
            const notificationConfigModel = new NotificationConfigModel();
            await notificationConfigModel.updateNotificationConfig(id, data);
            ElNotification({
                title: "Éxito",
                message: "Configuración  actualizada con éxito",
                type: "success",
            });
            await fetchNotificationConfigs(true);
        } catch (error) {
            ElNotification({
                title: "Error",
                message: "No se pudo actualizar la configuración",
                type: "error",
            });
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,
        notificationConfigs,
        fetchNotificationConfigs,
        updateNotificationConfigRequest,
    };
});