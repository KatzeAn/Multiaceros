import type { PayrollPayment } from "@/domain/Interfaces/Payroll/Payroll.interface";
import { PayrollPaymentRepository } from "@/domain/repository/Payroll/Payroll.repository";
import axiosInstance from "@/presentation/api/axiosInstance";

export class PayrollPaymentModel extends PayrollPaymentRepository {
  async getPayrollPayments(): Promise<PayrollPayment[]> {
    try {
      const response = await axiosInstance.get("/GetPayrollSlips/GetPayrollPayment");
      return response.data as PayrollPayment[];
    } catch (error) {
      throw new Error("Unexpected error: " + error);
    }
  }
}
export default PayrollPaymentModel;