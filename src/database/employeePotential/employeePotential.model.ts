import type { EmployeePotential } from "@/domain/Interfaces/EmployeePotential/EmployeePotential.interface";
import { EmployeePotentialRepository } from "@/domain/repository/employeePotential/Employee.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class EmployeePotentialModel extends EmployeePotentialRepository {
  createEmployeePotential(data: EmployeePotential, file: File): Promise<EmployeePotential> {
    const formData = new FormData();
    formData.append("DocumentType", data.documentType.toString());
    formData.append("NumberDocument", data.numberDocument.toString());
    formData.append("FirstName", data.firstName);
    if (data.middleName) formData.append("MiddleName", data.middleName);
    formData.append("SurName", data.surName);
    formData.append("DateOfBirth", data.dateOfBirth);
    formData.append("Email", data.email);
    formData.append("CellPhone", data.cellPhone);
    if (data.jobPostingId) formData.append("JobPostingId", data.jobPostingId.toString());
    formData.append("File", file);
  
    return apiRequest<EmployeePotential>(
      "post",
      "/EmployeePotential/CreateEmployeePotential",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
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
