import type { NotificationConfig } from "@/domain/Interfaces/Notifications/Notifications.interface";
import { NotificationConfigRepository } from "@/domain/repository/Notifications/Notifications.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class NotificationConfigModel implements NotificationConfigRepository {
    getNotificationConfig(isActive: boolean): Promise<NotificationConfig[]> {
        return apiRequest<NotificationConfig[]>("get", `/NotificationConfig?isActive=${isActive}`);
    }
    updateNotificationConfig(id: number, data: Partial<NotificationConfig>): Promise<NotificationConfig> {
        return apiRequest<NotificationConfig>("put", `/NotificationConfig/${id}`, data);
    }
}
