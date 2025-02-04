import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";
import type { PensionFundsRepository } from "@/domain/repository/pensionFunds/pensionFunds.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class PensionFundsModel implements PensionFundsRepository {
    getPensionFunds(): Promise<PensionFunds[]> {
        return apiRequest<PensionFunds[]>("get", "/PensionFunds/GetPensionFunds");
    }
    createPensionFund(data: PensionFunds): Promise<PensionFunds> {
        return apiRequest<PensionFunds>("post", "/PensionFunds/CreatePensionFunds", data);
    }
    updatePensionFund(data: PensionFunds): Promise<PensionFunds> {
        return apiRequest<PensionFunds>("put", "/PensionFunds/UpdatePensionFunds", data);
    }
    deletePensionFund(pensionFundId: number, modifiedBy: string): Promise<PensionFunds> {
        return apiRequest<PensionFunds>("delete", `/PensionFunds/DeletePensionFunds`, { pensionFundId, modifiedBy });
    }
}