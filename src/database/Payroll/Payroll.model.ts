import type { PayrollPayment } from "@/domain/Interfaces/Payroll/Payroll.interface";
import type { PayrollPaymentRepository } from "@/domain/repository/Payroll/Payroll.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class PayrollPaymentModel implements PayrollPaymentRepository {
  getPayrollPayments(): Promise<PayrollPayment[]> {
    return apiRequest<PayrollPayment[]>("get", "/GetPayrollSlips/GetPayrollPayment");
  }

   getPayrollSlip(userId: number): Promise<Blob> {
    return apiRequest<Blob>(
      "get",
      `/GetPayrollSlips/payroll-slips/`,
      userId,
      { responseType: "blob" }
    );
  }
  downloadPayrollSlip(): Promise<Blob> {
    return apiRequest<Blob>(
      "get",
      "/GetPayrollSlips/payroll-excel",
      undefined,
      { responseType: "blob" }
    );
  }
  

}
