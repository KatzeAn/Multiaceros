import type { LegalBenefits } from "@/domain/Interfaces/LegalBenefits/legalBenefits.interface";

export abstract class LegalBenefitsRepository {
    abstract getLegalBenefits(): Promise<LegalBenefits[]>;
    abstract createLegalBenefit(data: LegalBenefits): Promise<LegalBenefits>;
    abstract updateLegalBenefit(data: LegalBenefits): Promise<LegalBenefits>;
    abstract deleteLegalBenefit(id: number): Promise<LegalBenefits>;
}