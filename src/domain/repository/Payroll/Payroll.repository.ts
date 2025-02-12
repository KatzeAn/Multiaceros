import type { PayrollPayment } from "@/domain/Interfaces/Payroll/Payroll.interface";

export abstract class PayrollPaymentRepository {
  abstract getPayrollPayments(): Promise<PayrollPayment[]>;
}

