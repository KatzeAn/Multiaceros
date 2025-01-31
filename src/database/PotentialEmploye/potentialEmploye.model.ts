import type { EmployeePotentialRequest } from "@/domain/Interfaces/request/EmployeePotentialRequest.interface";
import axiosInstance from "@/presentation/api/axiosInstance";
import { EmployeePotentialRepository } from "@/domain/repository/PotentialEmploye/Employerepository";
import type { EmployeePotential } from "@/domain/Interfaces/Employeepotential.interface";

export class PotentialEmployeeModel extends EmployeePotentialRepository {
  async createEmployee(data: EmployeePotentialRequest): Promise<EmployeePotentialRequest> {
    try {
      const response = await axiosInstance.post(`/api/EmployeePotential/Create`, data);
      return response.data as EmployeePotentialRequest;
    } catch (error) {
        throw new Error("Unexpected error: " + error);
    }
  }

  async getAllEmployees(): Promise<EmployeePotentialRequest> {
    try {
      const response = await axiosInstance.get(`/api/EmployeePotential/GetAllEmployees`);
      return response.data as EmployeePotentialRequest;
    } catch (error) {
        throw new Error("Unexpected error: " + error);
    }
  }

  async updateEmployee(status: string, rejectionReason: number, data: EmployeePotentialRequest ): Promise<EmployeePotentialRequest> {
    try {
      const response = await axiosInstance.put(`/api/EmployeePotential/UpdateEmployeePotenjal`, { status, rejectionReason, data });
      return response.data as EmployeePotentialRequest;
    } catch (error) {
        throw new Error("Unexpected error: " + error);
    }
  }

  async getEmployeeByDocument(numberDocument: string): Promise<EmployeePotentialRequest> {
    try {
      const response = await axiosInstance.get(`/api/EmployeePotential/${numberDocument}`);
      return response.data as EmployeePotentialRequest;
    } catch (error) {
        throw new Error("Unexpected error: " + error);
    }
  }
}
