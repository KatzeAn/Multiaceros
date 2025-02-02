import type { AbsenceRequest } from "@/domain/Interfaces/AbsenceRequest.interface";

export abstract class AbsenceRepository {
    abstract getAbsences(): Promise<Absence[]>;
    abstract getMonthlyAbsences(): Promise<Absence[]>;
    abstract getPendingAbsences(): Promise<Absence[]>;
    abstract getUpcomingAbsences(): Promise<Absence[]>;
    abstract createAbsenceRequest(from: string, to: string, type: string, evidencePath: string, comment: string, requestedById: string): Promise<AbsenceRequest>
    abstract updateAbsenceRequest(absenceId: number, from: string, to: string, type: string, evidencePath: string, comment: string, requestedById: string): Promise<AbsenceRequest>;
    abstract deleteAbsenceRequest(absenceId: number, modifiedBy: string): Promise<Absence>;
    abstract approveAbsenceRequest(absenceId: number): Promise<Absence>;
    abstract rejectAbsenceRequest(absenceId: number): Promise<Absence>;
}