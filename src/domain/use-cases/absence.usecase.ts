import { AbsenceService } from "@/services/absence/absence.service";

export class GetMonthlyAbsencesUseCase {
    constructor(private readonly absenceService: AbsenceService){}

    public static execute() {
        return AbsenceService.getMonthlyAbsences()
    }
}

export class GetPendingAbsencesUseCase {
    constructor(private readonly absenceService: AbsenceService){}

    public static execute() {
        return AbsenceService.getPendingAbsences()
    }
}

export class GetUpcomingAbsencesUseCase {
    constructor(private readonly absenceService: AbsenceService){}

    public static execute() {
        return AbsenceService.getUpcomingAbsences()
    }
}

export class ApproveAbsenceRequestUseCase {
    constructor(private readonly absenceService: AbsenceService){}

    public static execute(absenceId: number) {
        return AbsenceService.approveAbsenceRequest(absenceId)
    }
}

export class RejectAbsenceRequestUseCase {
    constructor(private readonly absenceService: AbsenceService){}

    public static execute(absenceId: number) {
        return AbsenceService.rejectAbsenceRequest(absenceId)
    }
}