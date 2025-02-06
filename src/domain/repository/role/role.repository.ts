import type { Role } from "@/domain/Interfaces/role/role.interface";
import type { RoleRequest } from "@/domain/Interfaces/role/roleRequest.interface";

export abstract class RoleRepository {
    abstract getRoles(): Promise<Role[]>;
    abstract assignRole(id: number, role: RoleRequest): Promise<RoleRequest>;
}