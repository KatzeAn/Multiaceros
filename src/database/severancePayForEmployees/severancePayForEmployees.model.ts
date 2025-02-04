import type { SeverancePayForEmployees } from "@/domain/Interfaces/severancePayForEmployees/severancePayForEmployees.interface";
import type { SeverancePayForEmployeesRepository } from "@/domain/repository/severancePayForEmployees/severancePayForEmployees.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class SeverancePayForEmployeesModel implements SeverancePayForEmployeesRepository {
    getSeverancePayForEmployeeById(numberDocument: string): Promise<SeverancePayForEmployees[]> {
        return apiRequest<SeverancePayForEmployees[]>("get", `/SeverancePayForEmployees/GetEmployeesSeverancePayByID/${numberDocument}`);
    }
}