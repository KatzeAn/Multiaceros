export interface SeverancePayForEmployees {
  numberDocument?: string;
  fullName?: string;
  salary: number;
  address?: string;
  cellPhone?: string;
  userEmail?: string;
  contractStartDate: Date;
  contractEndDate: Date;
  daysWorked: number;
  daysWorkedLastMonth: number;
  bonification: number;
  discountPension: number;
  discountHealth: number;
  valueBenefit: number;
  transportValue: number;
  lastMonthSalary: number;
  vacation: number;
  prima: number;
  severance: number;
  interestSeverance: number;
  totalSettlement: number;
}
