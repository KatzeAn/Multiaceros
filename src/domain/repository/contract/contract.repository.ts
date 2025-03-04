import type { Contract } from "@/domain/Interfaces/Contract/contract.interface";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";

export abstract class ContractRepository {
  abstract getContracts(): Promise<ContractType[]>;
  abstract createContract(contract: Contract): Promise<Contract>;
  abstract getContractsByDaysRemaining(daysRemaining: number): Promise<ContractType[]>;
  abstract updateContract(id: number, contract: Contract): Promise<Contract>;
}
