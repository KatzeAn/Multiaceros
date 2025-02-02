import type { ActiveBreak } from "@/domain/Interfaces/ActiveBreaks/ActiveBreak.interface";
import type { Attedance } from "@/domain/Interfaces/ActiveBreaks/Attendance.interface";
import { ActiveBreaksRepository } from "@/domain/repository/activeBreaks/activeBreaks.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class ActiveBreakModel extends ActiveBreaksRepository {
  getActiveBreaks(): Promise<ActiveBreak[]> {
    return apiRequest<ActiveBreak[]>("get", "/ActiveBreaks/all-active-breaks");
  }
  getTodayActiveBreaks(): Promise<ActiveBreak[]> {
    return apiRequest<ActiveBreak[]>(
      "get",
      "/ActiveBreaks/today-active-breaks"
    );
  }
  getAttendanceHistory(employeeId: number): Promise<Attedance[]> {
    return apiRequest<Attedance[]>(
      "get",
      `/ActiveBreaks/${employeeId}/attendance-history`
    );
  }
  getAttendance(activeBreakId: number): Promise<Attedance[]> {
    return apiRequest<Attedance[]>(
      "get",
      `/ActiveBreaks/${activeBreakId}/attendance`
    );
  }
  createActiveBreakRequest(
    date: string,
    startTime: { ticks: number },
    description: string,
    createdBy: string
  ): Promise<ActiveBreak> {
    return apiRequest<ActiveBreak>("post", "/Absence/CreateAbsence", {
      ActiveBreak: {
        date,
        startTime,
        description,
        createdBy,
      },
    });
  }
  createAttendance(
    employeeId: number,
    activeBreakId: number,
    attended: boolean,
    registrationDate: string,
    createdBy: string
  ): Promise<Attedance> {
    return apiRequest<Attedance>("post", "/Absence/CreateAbsence", {
      Attedance: {
        employeeId,
        activeBreakId,
        attended,
        registrationDate,
        createdBy,
      },
    });
  }
  updateActiveBreakRequest(
    id: number,
    date: string,
    startTime: { ticks: number },
    description: string,
    createdBy: string
  ): Promise<ActiveBreak> {
    return apiRequest<ActiveBreak>("post", "/Absence/CreateAbsence", {
      ActiveBreak: {
        id,
        date,
        startTime,
        description,
        createdBy,
      },
    });
  }
}
