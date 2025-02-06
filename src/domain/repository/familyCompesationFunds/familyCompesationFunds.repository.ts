import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";

export abstract class FamilyCompesationFundsRepository {
    abstract getFamilyCompesationFunds(): Promise<FamilyCompesationFunds[]>;
    abstract createFamilyCompesationFunds(data: FamilyCompesationFunds): Promise<FamilyCompesationFunds>;
    abstract updateFamilyCompesationFunds(data: FamilyCompesationFunds): Promise<FamilyCompesationFunds>;
    abstract deleteFamilyCompesationFunds(data: FamilyCompesationFunds): Promise<FamilyCompesationFunds>;
}