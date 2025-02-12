export interface AbsenceRequest {
    id?: number | string;
    StartDate: string;
    EndDate: string;
    AbsenceTypeId: string;
    Comment: string;
    EvidenceFilePath: string;
    UserId: string;
}
