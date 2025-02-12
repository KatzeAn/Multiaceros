import { PayrollPaymentModel } from "@/database/Payroll/Payroll.model";
import type { PayrollPayment } from "@/domain/Interfaces/Payroll/Payroll.interface";
import { defineStore } from "pinia";

export const usePayrollPaymentStore = defineStore("payrollPayment", () => {
  const fetchPayrollPayments = async () => {
    const result = {
      loading: true,
      payrollPayments: [] as PayrollPayment[],
    };

    try {
      result.loading = true;
      const payrollService = new PayrollPaymentModel();
      result.payrollPayments = await payrollService.getPayrollPayments();
    } catch (error) {
      console.error("Error fetching payroll payments:", error);
      result.payrollPayments = [];
    } finally {
      result.loading = false;
    }

    return result;
  };

  const fetchPayrollSlip = async (userId: number) => {
    const result = {
      loading: true,
      payrollSlip: null as Blob | null,
    };

    try {
      result.loading = true;
      const payrollService = new PayrollPaymentModel();
      result.payrollSlip = await payrollService.getPayrollSlip(userId);
    } catch (error) {
      console.error("Error fetching payroll slip:", error);
      result.payrollSlip = null;
    } finally {
      result.loading = false;
    }

    return result;
  };

  return {
    fetchPayrollPayments,
    fetchPayrollSlip,
  };
});
