import type { ActiveBreak } from "@/domain/Interfaces/ActiveBreaks/ActiveBreak.interface";
import type { Attedance } from "@/domain/Interfaces/ActiveBreaks/Attendance.interface";

export abstract class ActiveBreaksRepository {
    abstract getActiveBreaks(): Promise<ActiveBreak[]>;
    abstract getTodayActiveBreaks(): Promise<ActiveBreak[]>;
    abstract getAttendanceHistory(employeeId: number): Promise<Attedance[]>;
    abstract getAttendance(activeBreakId: number): Promise<Attedance[]>;
    abstract createActiveBreakRequest(date: string, startTime: {ticks: number }, description: string, createdBy: string): Promise<ActiveBreak>
    abstract createAttendance(employeeId: number, activeBreakId: number, attended: boolean,registrationDate: string, createdBy: string): Promise<Attedance>;
    abstract updateActiveBreakRequest(id: number, date: string, startTime: {ticks: number }, description: string, createdBy: string): Promise<ActiveBreak>;
}