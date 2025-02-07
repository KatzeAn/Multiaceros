import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";
import type { Employee } from "@/domain/Interfaces/Employee/employee.interface";

export abstract class EmployeeRepository {
  abstract getEmploymentCertificate(userId: number): Promise<Blob>;
  abstract getActiveEmployees(): Promise<Employee[]>;
  abstract getEmployees(): Promise<BasicEmployee[]>;
  abstract createEmployee(employee: Employee): Promise<Employee>;
  abstract updateEmployee(employee: Employee): Promise<Employee>;
  abstract deleteEmployee(id: number): Promise<Employee>;
  abstract SearchEmployeeByDocument(numberDocument: number): Promise<Employee[]>;
}
