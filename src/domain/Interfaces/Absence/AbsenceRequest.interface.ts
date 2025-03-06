export interface AbsenceRequest {
    id?: number | string;
    name: string;
    StartDate: string;
    EndDate: string;
    AbsenceTypeId: string;
    Comment: string;
    EvidenceFilePath: string;
    UserId: string;
    isActive: boolean;
}
