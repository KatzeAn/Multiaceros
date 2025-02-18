import type { Eps } from "@/domain/Interfaces/Eps/eps.interface";

export abstract class EpsRepository {
    abstract getEps(): Promise<Eps[]>;
    abstract getEpsById(id: number): Promise<Eps>;
    abstract createEps(data: Eps): Promise<Eps>;
    abstract updateEps(id: number, data: Eps): Promise<Eps>;
    abstract deleteEps(id: number, modifiedBy: string): Promise<Eps>;
}