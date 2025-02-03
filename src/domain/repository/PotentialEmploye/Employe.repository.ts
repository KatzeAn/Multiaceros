import type { EmployeePotential } from "@/domain/Interfaces/Employeepotential.interface";
import type { EmployeePotentialRequest } from "@/domain/Interfaces/request/EmployeePotentialRequest.interface";

export abstract class EmployeePotentialRepository {
  abstract createEmployee(data: EmployeePotentialRequest): Promise<EmployeePotentialRequest>;
  abstract getAllEmployees(): Promise<EmployeePotentialRequest>;
  abstract updateEmployee(status: string, rejectionReason: number, data: EmployeePotentialRequest): Promise<EmployeePotential>;
  abstract getEmployeeByDocument(numberDocument: string): Promise<EmployeePotentialRequest>;
}
