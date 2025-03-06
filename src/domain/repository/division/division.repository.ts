import type { Division } from "@/domain/Interfaces/Division/division.interface";
import type { DivisionWithEmployee } from "@/domain/Interfaces/Division/divisionWithEmployee.interface";
import type { Teammate } from "@/domain/Interfaces/Division/teammate.interface";

export abstract class DivisionRepository {
  abstract getDivisions(isActive?: boolean): Promise<Division[]>;
  abstract getOrganizationalChart(): Promise<DivisionWithEmployee[]>;
  abstract createDivision(name: string, createdBy: string): Promise<Division>;
  abstract updateDivision(id: number, newName: string, modifiedBy: string): Promise<Division>;
  abstract deleteDivision(id: number, modifiedBy: string): Promise<Division>;
  abstract getTeammates(userId: number): Promise<Teammate[]>;
}
