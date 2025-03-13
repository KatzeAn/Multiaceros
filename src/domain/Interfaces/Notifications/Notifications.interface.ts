export interface NotificationConfig {
    id: number;
    name: string;
    daysBefore: string;
    isActive: boolean;
    description: string;
    excessVacationDays: number;
    modifiedBy: string;
    createdAt?: string;
    updatedAt?: string;
}