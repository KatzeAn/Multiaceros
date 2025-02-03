import type { AbsenceRequest } from "@/domain/Interfaces/Absence/AbsenceRequest.interface";
import { UserRepository } from "@/domain/repository/auth/user.repository";
import axiosInstance from "@/presentation/api/axiosInstance";

export class UserModel extends UserRepository {

    async createAbsenceRequest(from: string, to: string, type: string, evidencePath: string, comment: string, requestedById: string): Promise<AbsenceRequest> {
        try {
            const response = await axiosInstance.post(`/Absence/CreateAbsence`, {
                absenceRequest: {
                    startDate: new Date(from),
                    endDate: new Date(to), 
                    absenceType: type, 
                    comment: comment, 
                    evidenceFilePath: evidencePath, 
                    requestedById: requestedById,
                    createdBy: requestedById
                }
            });
    
            return response.data as AbsenceRequest;
        } catch (error) {
            throw new Error("Unexpected error: " + error);
        }
    }

    async getBirthdaysOfMonth(): Promise<UserBirthdayList> {
        try {
            const response = await axiosInstance.get(`/User/GetBirthdays`, {
                responseType: 'json',
            });

            return response.data as UserBirthdayList;
        } catch (error) {
            throw new Error("Unexpected error: " + error);
        }
    }
}