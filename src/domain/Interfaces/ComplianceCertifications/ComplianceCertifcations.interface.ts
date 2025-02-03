export interface ComplianceCertifications {
  id?: number;
  name: string;
  description: string;
  issueDate: string;
  expirationDate: string;
  issuingOrganization: string;
  type: string;
  certificateCode: string;
  certificateFile: string;
  employeeId: number;
  isActive?: boolean;
  createdBy?: string;
  modifiedBy?: string;
}
