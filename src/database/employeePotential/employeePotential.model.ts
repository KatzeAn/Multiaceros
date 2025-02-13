import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";
import { EmployeePotentialRepository } from "@/domain/repository/employeePotential/Employee.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class EmployeePotentialModel extends EmployeePotentialRepository {
  createEmployeePotential(data: EmployeePotential): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>(
      "post",
      "/EmployeePotential/CreateEmployeePotential",
      {
        documentType: data.documentType,
        numberDocument: data.numberDocument,
        firstName: data.firstName,
        middleName: data.middleName,
        surName: data.surName,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        cellPhone: data.cellPhone,
        jobPostingId: data.jobPostingId,
      }
    );
  }
  getAllEmployeesPotential(): Promise<EmployeePotential[]> {
    return apiRequest<EmployeePotential[]>(
      "get",
      "/EmployeePotential/GetAllEmployeesPotential"
    );
  }
  updateEmployeePotential(data: EmployeePotential): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>(
      "put",
      `/EmployeePotential/UpdateEmployeePotential/${data.numberDocument}`,
      { data }
    );
  }
  getEmployeePotentialByDocument(
    numberDocument: number
  ): Promise<EmployeePotential> {
    return apiRequest<EmployeePotential>(
      "get",
      `/EmployeePotential/${numberDocument}`
    );
  }
}
