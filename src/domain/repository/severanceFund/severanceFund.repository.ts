import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";

export abstract class  SeveranceFundRepository {
    abstract getSeveranceFund(isActive?: boolean): Promise<SeveranceFund[]>;
    abstract createSeveranceFund(data: SeveranceFund): Promise<SeveranceFund>;
    abstract updateSeveranceFund(id: number, severanceFundName: string, modifiedBy: string): Promise<SeveranceFund>;
    abstract deleteSeveranceFund(severanceFundId: number, modifiedBy: string): Promise<SeveranceFund>;
}