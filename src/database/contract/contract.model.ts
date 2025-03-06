import type { Contract } from "@/domain/Interfaces/Contract/contract.interface";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";
import type { ContractRepository } from "@/domain/repository/contract/contract.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class ContractModel implements ContractRepository {
    getContracts(isActive: boolean): Promise<ContractType[]> {
        return apiRequest<ContractType[]>("get",`/ContractType?isActive=${isActive}` );
    }
    createContract(contract: Contract): Promise<Contract> {
        return apiRequest<Contract>("post", "/Contract", { contract });
    }
    getContractsByDaysRemaining(daysRemaining: number): Promise<ContractType[]> {
        return apiRequest<ContractType[]>("get", `/Contract/GetByDaysRemaining/${daysRemaining}`);
    }
    updateContract(id: number, contract: Contract): Promise<Contract> {
        return apiRequest<Contract>("put", `/Contract/${id}`, contract);
    }
}
