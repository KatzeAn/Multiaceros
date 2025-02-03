import type { GeneralMonthlyPayrollPayment } from "@/domain/Interfaces/GetMonthlyPayrollPayments/GeneralMonthlyPayrollPayment.interface";
import type { GetMonthlyPayrollPaymentsRepository } from "@/domain/repository/getMonthlyPayrollPayments/getMonthlyPayrollPayments.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class GetMonthlyPayrollPaymentsModel implements GetMonthlyPayrollPaymentsRepository {
    getMonthlyPayrollPayments(numberDocument: number): Promise<GeneralMonthlyPayrollPayment> {
        return apiRequest<GeneralMonthlyPayrollPayment>("get", `/GetMonthlyPayrollPayments/${numberDocument}`);
    }
}