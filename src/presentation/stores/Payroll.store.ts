import { PayrollPaymentModel } from "@/database/Payroll/Payroll.model";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";

export const usePayrollPaymentStore = defineStore("payrollPayment", () => {
  const fetchPayrollPayments = async () => {
    try {
      const payrollService = new PayrollPaymentModel();
      return await payrollService.getPayrollPayments();
    } catch (error) {
      console.error("Error fetching payroll payments:", error);
      return null;
    }
  };

  const fetchPayrollSlip = async (userId: number, year: number, month: number) => {
    try {
      const payrollService = new PayrollPaymentModel();
      const response = await payrollService.getPayrollSlip(userId, year, month);
  
      const url = window.URL.createObjectURL(response);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `payroll_slip_${year}_${month}.pdf`;
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading payroll slip:", error);
      ElNotification({
        title: "Error",
        message: "An error occurred while downloading the payroll slip",
        type: "error",
      });
      throw error;
    }
  };
  
  const fetchDownloadPayrollSlip = async () => {
    const result = {
      loading: true,
      payrollSlip: null as Blob | null,
    };

    try {
      result.loading = true;
      const payrollService = new PayrollPaymentModel();
      result.payrollSlip = await payrollService.downloadPayrollSlip();
    } catch (error) {
      console.error("Error fetching payroll slip:", error);
      result.payrollSlip = null;
    } finally {
      result.loading = false;
    }

    return result;
  };

  const fetchSeverancePayAndInterest = async () => {
    const result = {
      loading: true,
      severancePayFile: null as Blob | null,
    };
  
    try {
      result.loading = true;
      const payrollService = new PayrollPaymentModel();
      result.severancePayFile = await payrollService.getSeverancePayAndInterest();
    } catch (error) {
      console.error("Error fetching severance pay and interest:", error);
      result.severancePayFile = null;
    } finally {
      result.loading = false;
    }
  
    return result;
  };
  
  

  return {
    fetchPayrollPayments,
    fetchPayrollSlip,
    fetchDownloadPayrollSlip,
    fetchSeverancePayAndInterest,
  };
});
