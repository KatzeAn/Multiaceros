import { PayrollPaymentModel } from "@/database/Payroll/Payroll.model";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";


export const usePayrollPaymentStore = defineStore("payrollPayment", () => {
  const errorMessage = ref<string | null | undefined>(null);
  const { t } = useI18n();

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
    } catch (error: any) {
            errorMessage.value = error as string;
            ElNotification({
              title: t("notifications.error.title"),
              message: errorMessage.value,
              type: 'error',
       });
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
   } catch (error: any) {
                 errorMessage.value = error as string;
                 ElNotification({
                  title: t("notifications.error.title"),
                     message: errorMessage.value,
                     type: 'error',
                 });
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
   } catch (error: any) {
                 errorMessage.value = error as string;
                 ElNotification({
                  title: t("notifications.error.title"),
                     message: errorMessage.value,
                     type: 'error',
                 });
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
