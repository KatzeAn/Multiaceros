import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";

export abstract class FamilyCompesationFundsRepository {
    abstract getFamilyCompesationFunds(isActive?: boolean): Promise<FamilyCompesationFunds[]>;
    abstract createFamilyCompesationFunds(data: FamilyCompesationFunds): Promise<FamilyCompesationFunds>;
    abstract updateFamilyCompesationFunds(id: number,compensationFundName: string, modifiedBy: string): Promise<FamilyCompesationFunds>;
    abstract deleteFamilyCompesationFunds(compesationfundsID: number, modifiedBy: string): Promise<FamilyCompesationFunds>;
}