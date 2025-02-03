import type { Division } from "@/domain/Interfaces/Division/division.interface";
import type { DivisionWithEmployee } from "@/domain/Interfaces/Division/divisionWithEmployee.interface";
import type { DivisionRepository } from "@/domain/repository/division/division.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class DivisionModel implements DivisionRepository {
    getDivisions(): Promise<Division[]> {
        return apiRequest<Division[]>('get', '/Division/GetAllDivisions');
    }
    getOrganizationalChart(): Promise<DivisionWithEmployee[]> {
        return apiRequest<DivisionWithEmployee[]>('get', '/Division/GetOrganizationalChart');
    }
    createDivision(name: string, createdBy: string): Promise<Division> {
        return apiRequest<Division>('post', '/Division/CreateDivision', { name, createdBy });
    }
    updateDivision(id: number, newName: string, modifiedBy: string): Promise<Division> {
        return apiRequest<Division>('put', `/Division/${id}`, { divisionId: id, newName,modifiedBy });
    }
    deleteDivision(id: number, modifiedBy: string): Promise<Division> {
        return apiRequest<Division>('patch', `/Division/${id}/DivisionDelete`, { divisionId: id, modifiedBy });
    }
}