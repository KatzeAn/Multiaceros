export interface EmployeePotential {
  id?: number;
  documentType: number;
  status?: number;
  rejectionReason?: number;
  numberDocument: string;
  firstName: string;
  middleName: string;
  surName: string;
  dateOfBirth: string;
  email: string;
  cellPhone: string;
  jobPostingId?: number;
  jobPostingTitle?: string;
  jobPostingPublicationDate?: string;
}
