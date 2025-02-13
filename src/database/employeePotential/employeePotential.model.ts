import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";
import { EmployeePotentialRepository } from "@/domain/repository/employeePotential/Employee.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class EmployeePotentialModel extends EmployeePotentialRepository {
  createEmployeePotential(data: EmployeePotential): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>("post", "/api/EmployeePotential/CreateEmployeePotential", { data });
  }
  getAllEmployeesPotential(): Promise<EmployeePotential[]> {
    return apiRequest<EmployeePotential[]>("get", "/api/EmployeePotential/GetAllEmployeesPotential");
  }
  updateEmployeePotential(data: EmployeePotential): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>("put", `/api/EmployeePotential/UpdateEmployeePotential/${data.numberDocument}`, { data });
  }
  getEmployeePotentialByDocument(numberDocument: number): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>(
      "get",
      `/api/EmployeePotential/${numberDocument}`
    );
  }
}
