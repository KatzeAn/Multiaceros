import type { NotificationConfig } from "@/domain/Interfaces/Notifications/Notifications.interface";

export abstract class NotificationConfigRepository {
    abstract getNotificationConfig(isActive?: boolean): Promise<NotificationConfig[]>;
    abstract updateNotificationConfig(id: number, data: Partial<NotificationConfig>): Promise<NotificationConfig>;
}