export interface Employee {
  employeeId?: number;
  userId: number;
  salary: number;
  contributionId: number;
  arlInfoId: number;
  benefitsId: number;
  jobTitleId: number;
  divisionId: number;
  bloodTypeId: number;
  pensionFundInfoId: number;
  severanceFundId: number;
  epsInfo: number;
  legalID: number;
  compensationFundId: number;
  contractID: number;
  isActive?: boolean;
  createdBy?: string;
  modifiedBy?: string;
}
