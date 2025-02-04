import type { SeverancePayForEmployees } from "@/domain/Interfaces/severancePayForEmployees/severancePayForEmployees.interface";

export abstract class SeverancePayForEmployeesRepository {
    abstract getSeverancePayForEmployeeById(numberDocument: string): Promise<SeverancePayForEmployees[]>;
}