import type { Arl } from "@/domain/Interfaces/Arl/Arl.interface";

export abstract class ArlRepository {
  abstract getAll(): Promise<Arl[]>;
  abstract create(nameArl: string): Promise<Arl>;
  abstract update(id: number, nameArl: string, modifiedBy: string): Promise<Arl>;
  abstract delete(arlID: number, modifiedBy: string): Promise<Arl>;
}