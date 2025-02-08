export interface Contract {
  employeeId: number;
  contractStartDate: string;
  contractEndDate: string;
  contractTypeId: number | undefined;
  updatedBy: string;
}
