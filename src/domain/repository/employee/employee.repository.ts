import type { Employee } from "@/domain/Interfaces/Employee/employee.interface";

export abstract class EmployeeRepository {
  abstract getEmploymentCertificate(userId: number): Promise<Blob>;
  abstract getActiveEmployees(): Promise<Employee[]>;
  abstract getEmployees(): Promise<Employee[]>;
  abstract createEmployee(employee: Employee): Promise<Employee>;
  abstract updateEmployee(employee: Employee): Promise<Employee>;
  abstract deleteEmployee(id: number): Promise<Employee>;
  abstract SearchEmployeeByDocument(numberDocument: number): Promise<Employee[]>;
}
