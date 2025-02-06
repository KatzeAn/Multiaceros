import type { LegalBenefits } from "@/domain/Interfaces/LegalBenefits/legalBenefits.interface";
import { LegalBenefitsRepository } from "@/domain/repository/legalBenefits/legalBenefits.repository"
import { apiRequest } from "@/presentation/api/axiosInstance";

export class LegalBenefitsModel implements LegalBenefitsRepository {
    getLegalBenefits(): Promise<LegalBenefits[]> {
        return apiRequest<LegalBenefits[]>("get", "legalBenefits/GetLegalBenefits");
    }
    createLegalBenefit(data: LegalBenefits): Promise<LegalBenefits> {
        return apiRequest<LegalBenefits>("post", "legalBenefits/CreateLegalBenefit", data);
    }
    updateLegalBenefit(data: LegalBenefits): Promise<LegalBenefits> {
        return apiRequest<LegalBenefits>("put", "legalBenefits/UpdateLegalBenefit", data);
    }
    deleteLegalBenefit(id: number): Promise<LegalBenefits> {
        return apiRequest<LegalBenefits>("patch", `legalBenefits/DeleteLegalBenefit`, { id });
    }
}