import { PotentialEmployeeModel } from "@/database/PotentialEmploye/potentialEmploye.model"
import type { EmployeePotentialRequest } from "@/domain/Interfaces/request/EmployeePotentialRequest.interface";

export class PotentialService {
    public static  createEmployee(data: EmployeePotentialRequest): Promise<EmployeePotentialRequest>
    {
        return new   PotentialEmployeeModel ().createEmployee (data)
    }
    public static getAllEmployees(): Promise<EmployeePotentialRequest>{
        return new PotentialEmployeeModel().getAllEmployees()
    }
    public static  updateEmployee(status: string, rejectionReason: number, data: EmployeePotentialRequest): Promise<EmployeePotentialRequest>
    {
        return new PotentialEmployeeModel().updateEmployee(status, rejectionReason, data)
    }
    public static  getEmployeeByDocument(numberDocument: string): Promise<EmployeePotentialRequest>
    {
        return new PotentialEmployeeModel().getEmployeeByDocument(numberDocument)
    }
    
    
}