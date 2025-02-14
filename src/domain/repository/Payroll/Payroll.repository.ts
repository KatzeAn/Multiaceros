import type { PayrollPayment } from "@/domain/Interfaces/Payroll/Payroll.interface";

export abstract class PayrollPaymentRepository {
  abstract getPayrollPayments(): Promise<PayrollPayment[]>;
  abstract getPayrollSlip(userId: number): Promise<Blob>;
  abstract downloadPayrollSlip(): Promise<Blob>;
}
