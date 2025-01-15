import type { Absence } from "@/domain/Interfaces/Absence.interface";
import { AbsenceRepository } from "@/domain/repository/absence/absences.repository";
import axiosInstance from "@/presentation/api/axiosInstance";

export class AbsenceModel extends AbsenceRepository {
    async getMonthlyAbsences(): Promise<Absence> {
        try {
            const response = await axiosInstance.get(`/Absence/MonthlyAbsences`, {
                responseType: 'json',
            });

            return response.data as Absence;
        } catch (error) {
            throw new Error("Unexpected error: " + error);
        }
    }
    async getPendingAbsences(): Promise<Absence> {
        try {
            const response = await axiosInstance.get(`/Absence/Pending`, {
                responseType: 'json',
            });

            return response.data as Absence;
        } catch (error) {
            throw new Error("Unexpected error: " + error);
        }
    }
    async getUpcomingAbsences(): Promise<Absence> {
        try {
            const response = await axiosInstance.get(`/Absence/Upcoming`, {
                responseType: 'json',
            });

            return response.data as Absence;
        } catch (error) {
            throw new Error("Unexpected error: " + error);
        }
    }
    async approveAbsenceRequest(absenceId: number): Promise<Absence> {
        try {
            const response = await axiosInstance.patch(`/Absence/${absenceId}/approve`, {
                responseType: 'json',
            });

            return response.data as Absence;
        } catch (error) {
            throw new Error("Unexpected error: " + error);
        }
    }
    async rejectAbsenceRequest(absenceId: number): Promise<Absence> {
        try {
            const response = await axiosInstance.patch(`/Absence/${absenceId}/reject`, {
                responseType: 'json',
            });

            return response.data as Absence;
        } catch (error) {
            throw new Error("Unexpected error: " + error);
        }
    }
    
}