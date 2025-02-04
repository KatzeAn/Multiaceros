import type { Role } from "@/domain/Interfaces/role/role.interface";
import type { RoleRequest } from "@/domain/Interfaces/role/roleRequest.interface";
import type { RoleRepository } from "@/domain/repository/role/role.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class RoleModel implements RoleRepository {
    getRoles(): Promise<Role[]> {
        return apiRequest<Role[]>("get", "/Role");
    }
    assignRole(id: number, role: RoleRequest): Promise<RoleRequest> {
        return apiRequest<RoleRequest>("post", `/Role/${id}/assign-role`, role);
    }
}