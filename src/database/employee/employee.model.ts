import type { Employee } from "@/domain/Interfaces/Employee/employee.interface";
import type { EmployeeRepository } from "@/domain/repository/employee/employee.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class EmployeeModel implements EmployeeRepository {
    getEmploymentCertificate(userId: number): Promise<Blob> {
        return apiRequest<Blob>("get", `Employee/${userId}/employment-certificate`, undefined, { responseType: "blob" });
    }
    getActiveEmployees(): Promise<Employee[]> {
        return apiRequest<Employee[]>("get", "Employee/employeeactivate");
    }
    getEmployees(): Promise<Employee[]> {
        return apiRequest<Employee[]>("get", "Employee/getallemployees");
    }
    createEmployee(employee: Employee): Promise<Employee> {
        return apiRequest<Employee>("post", "Employee/createemployees", employee);
    }
    updateEmployee(employee: Employee): Promise<Employee> {
        return apiRequest<Employee>("put", "Employee/updateemployees", employee);
    }
    deleteEmployee(id: number): Promise<Employee> {
        return apiRequest<Employee>("patch", `Employee/${id}/deactivate`);
    }
    SearchEmployeeByDocument(numberDocument: number): Promise<Employee[]> {
        return apiRequest<Employee[]>("get", `Employee/search/${numberDocument}`);
    }
}