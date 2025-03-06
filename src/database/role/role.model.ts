import type { Role } from "@/domain/Interfaces/role/role.interface";
import type { RoleRequest } from "@/domain/Interfaces/role/roleRequest.interface";
import type { RoleRepository } from "@/domain/repository/role/role.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class RoleModel implements RoleRepository {
    getRoles(isActive: boolean): Promise<Role[]> {
        return apiRequest<Role[]>("get", `/Role?isActive=${isActive}`);
    }
    assignRole(id: number, role: RoleRequest): Promise<RoleRequest> {
        const payload = { userId: id, roleId: role.roleId, modifiedBy: role.modifiedBy };
        return apiRequest<RoleRequest>("patch", `/Role/${id}/assign-role`, payload);
    }        
    
}