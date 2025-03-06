import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";
import type { PensionFundsRepository } from "@/domain/repository/pensionFunds/pensionFunds.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class PensionFundsModel implements PensionFundsRepository {
    getPensionFunds(isActive: boolean): Promise<PensionFunds[]> {
        return apiRequest<PensionFunds[]>("get", `/PensionFunds?isActive=${isActive}`);
    }
    createPensionFund(data: PensionFunds): Promise<PensionFunds> {
        return apiRequest<PensionFunds>("post", "/PensionFunds/CreatePensionFunds", data);
    }
    updatePensionFund(id: number, pensionFundName: string, modifiedBy: string): Promise<PensionFunds> {
        return apiRequest<PensionFunds>("put", "/PensionFunds/UpdatePensionFunds", {  pensionFundId: id, pensionFundName, modifiedBy 
        });
    }
    
    deletePensionFund(pensionFundId: number, modifiedBy: string): Promise<PensionFunds> {
        return apiRequest<PensionFunds>(
            "patch",
            `/PensionFunds/pensionfundsdelete?pensionfundsId=${pensionFundId}&modifiedBy=${modifiedBy}`
        );
    }
}