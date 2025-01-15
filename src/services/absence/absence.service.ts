import { AbsenceModel } from "@/database/absence/absences.model";
import type { Absence } from "@/domain/Interfaces/Absence.interface";

export class AbsenceService {
    public static getMonthlyAbsences(): Promise<Absence> {
            return new AbsenceModel().getMonthlyAbsences();
        }
    
    public static getPendingAbsences(): Promise<Absence> {
        return new AbsenceModel().getPendingAbsences();
    }
    
    public static getUpcomingAbsences(): Promise<Absence> {
        return new AbsenceModel().getUpcomingAbsences();
    }
    
    public static approveAbsenceRequest(absenceId: number): Promise<Absence> {
        return new AbsenceModel().approveAbsenceRequest(absenceId);
    }
    
    public static rejectAbsenceRequest(absenceId: number): Promise<Absence> {
        return new AbsenceModel().rejectAbsenceRequest(absenceId);
    }
}