import type { AbsenceRequest } from "@/domain/Interfaces/Absence/AbsenceRequest.interface";
import { AbsenceRepository } from "@/domain/repository/absence/absences.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class AbsenceModel extends AbsenceRepository {
  getAbsences(): Promise<Absence[]> {
    return apiRequest<Absence[]>("get", "/Absence");
  }

  getMonthlyAbsences(): Promise<Absence[]> {
    return apiRequest<Absence[]>("get", "/Absence/MonthlyAbsences");
  }

  getPendingAbsences(): Promise<Absence[]> {
    return apiRequest<Absence[]>("get", "/Absence/Pending");
  }

  getUpcomingAbsences(): Promise<Absence[]> {
    return apiRequest<Absence[]>("get", "/Absence/Upcoming");
  }
  getApprovedAbsences(): Promise<Absence[]> {
    return apiRequest<Absence[]>("get", "/Absence/Approved");
  }
  
  getRejectedAbsences(): Promise<Absence[]> {
    return apiRequest<Absence[]>("get", "/Absence/Rejected");
  }
  

  createAbsenceRequest(
    StartDate: string,
    EndDate: string,
    AbsenceTypeId: string,
    EvidenceFilePath: string,
    Comment: string,
    UserId: string
  ): Promise<AbsenceRequest> {
    return apiRequest<AbsenceRequest>("post", "/Absence/CreateAbsence", {
      absenceRequest: { 
        StartDate: new Date(StartDate).toISOString(), 
        EndDate: new Date(EndDate).toISOString(),
        AbsenceTypeId, 
        Comment,
        EvidenceFilePath,
        UserId,
        createdBy: String(UserId),  
      },
    });
  }
  
    

  




  updateAbsenceRequest(
    absenceId: number,
    from: string,
    to: string,
    type: string,
    evidencePath: string,
    comment: string,
    requestedById: string
  ): Promise<AbsenceRequest> {
    return apiRequest<AbsenceRequest>("put", "/Absence/UpdateAbsence", {
      absenceRequest: {
        id: absenceId,
        startDate: new Date(from),
        endDate: new Date(to),
        absenceType: type,
        comment,
        evidenceFilePath: evidencePath,
        requestedById,
        createdBy: requestedById,
      },
    });
  }

  deleteAbsenceRequest(absenceId: number): Promise<Absence> {
    return apiRequest<Absence>("patch", `/Absence/${absenceId}/reject`);
  }

  approveAbsenceRequest(absenceId: number): Promise<Absence> {
    return apiRequest<Absence>("patch", `/Absence/${absenceId}/approve`);
  }

  rejectAbsenceRequest(absenceId: number): Promise<Absence> {
    return apiRequest<Absence>("patch", `/Absence/${absenceId}/reject`);
  }
}
