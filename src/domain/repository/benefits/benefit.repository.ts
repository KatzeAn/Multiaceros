import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";

export abstract class  BenefitRepository {
    abstract getBenefits(isActive?: boolean): Promise<Benefits[]>;
    abstract createBenefit(data: Benefits): Promise<Benefits>;
    abstract updateBenefit(id: number, nameBenefit: string, modifiedBy: string): Promise<Benefits>;
    abstract deleteBenefit(benefitID: number, modifiedBy: string): Promise<Benefits>;
}