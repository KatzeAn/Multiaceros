import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";

export abstract class PensionFundsRepository {
    abstract getPensionFunds(): Promise<PensionFunds[]>;
    abstract createPensionFund(data: PensionFunds): Promise<PensionFunds>;
    abstract updatePensionFund(data: PensionFunds): Promise<PensionFunds>;
    abstract deletePensionFund(pensionFundId: number, modifiedBy: string): Promise<PensionFunds>;
}