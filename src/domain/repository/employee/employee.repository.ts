import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";
import type { Employee } from "@/domain/Interfaces/Employee/employee.interface";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";

export abstract class EmployeeRepository {
  abstract getEmploymentCertificate(userId: number): Promise<Blob>;
  abstract getActiveEmployees(): Promise<Employee[]>;
  abstract getEmployees(): Promise<BasicEmployee[]>;
  abstract createEmployee(employee: EmployeeRequest): Promise<EmployeeRequest>;
  abstract updateEmployee(employee: Employee): Promise<Employee>;
  abstract deleteEmployee(id: number): Promise<Employee>;
  abstract SearchEmployeeByDocument(numberDocument: number): Promise<Employee[]>;
}
