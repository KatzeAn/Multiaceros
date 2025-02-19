import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";
import type { SeveranceFundRepository } from "@/domain/repository/severanceFund/severanceFund.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class SeveranceFundModel implements SeveranceFundRepository {
    getSeveranceFund(): Promise<SeveranceFund[]> {
        return apiRequest<SeveranceFund[]>("get", "/SeveranceFund/GetSeveranceFund");
    }
    createSeveranceFund(data: SeveranceFund): Promise<SeveranceFund> {
        return apiRequest<SeveranceFund>("post", "/SeveranceFund/CreateSeveranceFund", { SeveranceFundName: data.severanceFundName, CreatedBy: data.createdBy });
    }
    updateSeveranceFund(id: number, severanceFundName: string, modifiedBy: string): Promise<SeveranceFund> {
        return apiRequest<SeveranceFund>("put", "/SeveranceFund/UpdateSeveranceFund", {  id, severanceFundName, modifiedBy });
    }
    
    deleteSeveranceFund(severanceFundId: number, modifiedBy: string): Promise<SeveranceFund> {
        return apiRequest<SeveranceFund>(
            "patch",
            `/SeveranceFund/DeleteSeveranceFund?SeveranceFundId=${severanceFundId}&modifiedBy=${modifiedBy}`
        );
    }
    
}