import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";

export abstract class  BenefitRepository {
    abstract getBenefits(): Promise<Benefits[]>;
    abstract createBenefit(data: Benefits): Promise<Benefits>;
    abstract updateBenefit(data: Benefits): Promise<Benefits>;
    abstract deleteBenefit(id: number, modifiedBy: string): Promise<Benefits>;
}