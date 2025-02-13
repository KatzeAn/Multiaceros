import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";
import { EmployeePotentialRepository } from "@/domain/repository/employeePotential/Employee.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class EmployeePotentialModel extends EmployeePotentialRepository {
  createEmployeePotential(data: EmployeePotential): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>("post", "/api/EmployeePotential/Create", { data });
  }
  getAllEmployeesPotential(): Promise<EmployeePotential[]> {
    return apiRequest<EmployeePotential[]>("get", "/api/EmployeePotential/GetAllEmployees");
  }
  updateEmployeePotential(data: EmployeePotential): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>("put", "/api/EmployeePotential/UpdateEmployeePotenjal", { data });
  }
  getEmployeePotentialByDocument(numberDocument: number): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>(
      "get",
      `/api/EmployeePotential/${numberDocument}`
    );
  }
}
