import type { SeveranceFund } from "@/domain/Interfaces/severanceFund/severanceFund.interface";

export abstract class  SeveranceFundRepository {
    abstract getSeveranceFund(): Promise<SeveranceFund[]>;
    abstract createSeveranceFund(data: SeveranceFund): Promise<SeveranceFund>;
    abstract updateSeveranceFund(data: SeveranceFund): Promise<SeveranceFund>;
    abstract deleteSeveranceFund(data: Partial<SeveranceFund>): Promise<SeveranceFund>;
}