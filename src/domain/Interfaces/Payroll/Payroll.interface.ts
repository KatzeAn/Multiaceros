export interface PayrollPayment {
  employee: number;
  fullName: string;
  numberDocument: string;
  charge: string;
  basicSalary: number;
  daysWorkedInTheMonth: number;
  salary: number;
  transportationAssistance: number;
  activeBonusDaysInTheMonth: number;
  totalBonificationMonth: number;
  benefitDaysInTheMonth: number;
  valueBenefit: number;
  totalBenefitMonth: number;
  healthContribution: number;
  pensionContribution: number;
  solidarityFundContribution: number;
  severancePayInterest: number;
  totalIncome: number;
  totalDeductions: number;
  netPayable: number;
}
