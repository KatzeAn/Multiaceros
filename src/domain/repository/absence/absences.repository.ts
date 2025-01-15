import type { Absence } from "@/domain/Interfaces/Absence.interface";

export abstract class AbsenceRepository {
    abstract getMonthlyAbsences(): Promise<Absence>;
    abstract getPendingAbsences(): Promise<Absence>;
    abstract getUpcomingAbsences(): Promise<Absence>;
    abstract approveAbsenceRequest(absenceId: number): Promise<Absence>;
    abstract rejectAbsenceRequest(absenceId: number): Promise<Absence>;
}