import type { GeneralMonthlyPayrollPayment } from "@/domain/Interfaces/GetMonthlyPayrollPayments/GeneralMonthlyPayrollPayment.interface";

export abstract class GetMonthlyPayrollPaymentsRepository {
  abstract getMonthlyPayrollPayments(numberDocument: number): Promise<GeneralMonthlyPayrollPayment>;
}