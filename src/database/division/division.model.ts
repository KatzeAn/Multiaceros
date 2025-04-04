import type { Division } from "@/domain/Interfaces/Division/division.interface";
import type { DivisionWithEmployee } from "@/domain/Interfaces/Division/divisionWithEmployee.interface";
import type { Teammate } from "@/domain/Interfaces/Division/teammate.interface";
import type { DivisionRepository } from "@/domain/repository/division/division.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class DivisionModel implements DivisionRepository {
    getTeammates(userId: number): Promise<Teammate[]> {
        return apiRequest<Teammate[]>('get', `/Division/Division/Team/${userId}`);
    }
    getDivisions(isActive: boolean): Promise<Division[]> {
        return apiRequest<Division[]>('get', `/Division?isActive=${isActive}`);
    }
    getOrganizationalChart(): Promise<DivisionWithEmployee[]> {
        return apiRequest<DivisionWithEmployee[]>('get', '/Division/GetOrganizationalChart');
    }
    createDivision(name: string, createdBy: string): Promise<Division> {
        return apiRequest<Division>('post', '/Division', { name, createdBy });
    }
    updateDivision(id: number, newName: string, modifiedBy: string): Promise<Division> {
        return apiRequest<Division>('put', `/Division/${id}?modifiedBy=${modifiedBy}`, {divisionId: id, newName, modifiedBy });
    }
    deleteDivision(id: number, modifiedBy: string): Promise<Division> {
        return apiRequest<Division>('patch', `/Division/${id}/DivisionDelete?modifiedBy=${modifiedBy}`);
    }
}