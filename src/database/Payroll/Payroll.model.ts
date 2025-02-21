import type { PayrollPayment } from "@/domain/Interfaces/Payroll/Payroll.interface";
import type { PayrollPaymentRepository } from "@/domain/repository/Payroll/Payroll.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class PayrollPaymentModel implements PayrollPaymentRepository {
  getPayrollPayments(): Promise<PayrollPayment[]> {
    return apiRequest<PayrollPayment[]>("get", "/GetPayrollSlips/GetPayrollPayment");
  }

  getPayrollSlip(userId: number, year: number, month: number): Promise<Blob> {
    return apiRequest<Blob>(
      "get",
      `/GetPayrollSlips/${userId}/GetPayrollStubHistory-Pdf`,
      undefined,
      {
        params: { year, month },
        responseType: "blob",
      }
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
  getSeverancePayAndInterest(): Promise<Blob> {
    return apiRequest<Blob>(
      "get",
      "/GetPayrollSlips/SeverancePayAndSeveranceInterest",
      undefined,
      { responseType: "blob" }
    );
  }
}

