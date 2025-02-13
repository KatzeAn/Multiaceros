import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";

export abstract class EmployeePotentialRepository {
  abstract createEmployeePotential(data: EmployeePotential): Promise<EmployeePotential>;
  abstract getAllEmployeesPotential(): Promise<EmployeePotential[]>;
  abstract updateEmployeePotential(data: EmployeePotential): Promise<EmployeePotential>;
  abstract getEmployeePotentialByDocument(numberDocument: number): Promise<EmployeePotential>;
}
