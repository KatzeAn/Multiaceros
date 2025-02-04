import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";
import type { SeveranceFundRepository } from "@/domain/repository/severanceFund/severanceFund.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class SeveranceFundModel implements SeveranceFundRepository {
    getSeveranceFund(): Promise<SeveranceFund[]> {
        return apiRequest<SeveranceFund[]>("get", "/SeveranceFund/GetSeveranceFund");
    }
    createSeveranceFund(data: SeveranceFund): Promise<SeveranceFund> {
        return apiRequest<SeveranceFund>("post", "/SeveranceFund/CreateSeveranceFund", { data });
    }
    updateSeveranceFund(data: SeveranceFund): Promise<SeveranceFund> {
        return apiRequest<SeveranceFund>("put", "/SeveranceFund/UpdateSeveranceFund", { data });
    }
    deleteSeveranceFund(data: Partial<SeveranceFund>): Promise<SeveranceFund> {
        return apiRequest<SeveranceFund>("delete", "/SeveranceFund/DeleteSeveranceFund", { data });
    }
}