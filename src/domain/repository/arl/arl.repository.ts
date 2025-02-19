import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";

export abstract class ArlRepository {
  abstract getAll(): Promise<Arl[]>;
  abstract create(nameArl: string): Promise<Arl>;
  abstract update(arl: Arl): Promise<Arl>;
  abstract delete(arlID: number, modifiedBy: string): Promise<Arl>;
}