import type { AbsenceRequest } from "@/domain/Interfaces/Absence/AbsenceRequest.interface";

export abstract class UserRepository {
    abstract getBirthdaysOfMonth(): Promise<UserBirthdayList>;
    abstract createAbsenceRequest(from: string, to: string, type: string, evidencePath: string, comment: string, requestedById: string): Promise<AbsenceRequest>
}