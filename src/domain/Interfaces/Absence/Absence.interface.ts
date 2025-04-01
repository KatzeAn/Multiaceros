interface Absence {
    startDate: string;
    endDate: string; 
    absenceType: string;
    comment: string;
    evidenceFilePath: string;
    status: number;
    requestedById: number;
    fullName: string;
    id: number;
    name: string;
    createdBy: string;
    createdDate: string;
    modifiedBy?: string | null;
    modifiedDate?: string | null;
    isActive: boolean;
}

type AbsenceList = Absence[];