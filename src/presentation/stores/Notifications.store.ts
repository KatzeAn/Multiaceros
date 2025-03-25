import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { NotificationConfigModel } from "@/database/Notifications/Notifications.model";
import type { NotificationConfig } from "@/domain/Interfaces/Notifications/Notifications.interface";
import { ElNotification } from "element-plus";

export const useNotificationConfigStore = defineStore("notificationConfig", () => {
    const { t } = useI18n();
    const notificationConfigs = ref<NotificationConfig[]>([]);
    const isLoading = ref(false);
    const errorMessage = ref<string | null | undefined>(null);
    
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
                title: t("notifications.error.title"),
                message: t("notifications.error.notificationLoad"),
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
                title: t("notifications.success.title"),
                message: t("notifications.success.notificationUpdated"),
                type: "success",
            });
            await fetchNotificationConfigs(true);
        } catch (error: any) {
            errorMessage.value = error as string;
            ElNotification({
                title: t("notifications.error.title"),
                message: t("notifications.error.notificationUpdate"),
                type: "error",
            });
        }
    };

    return {
        isLoading,
        notificationConfigs,
        fetchNotificationConfigs,
        updateNotificationConfigRequest,
    };
});
