import { PotentialService } from "@/services/Employeepotential/Potential.service";
import type { EmployeePotentialRequest } from '../Interfaces/request/EmployeePotentialRequest.interface';

export class CreateEmployeePotentialUseCase {
    constructor(private readonly PotentialService: PotentialService){}

    public static execute(data: EmployeePotentialRequest) {
        return PotentialService.createEmployee (data)
    }
}
export class UpdateEmployeePotentialUseCase {
    constructor(private readonly PotentialService: PotentialService){}
    public static execute(status: string, rejectionReason: number,data: EmployeePotentialRequest) {
        return PotentialService.updateEmployee (status, rejectionReason, data)
    }
}
export class getAllEmployeesUseCase {
    constructor(private readonly PotentialService: PotentialService){}
    public static execute() {
        return PotentialService.getAllEmployees()
    }
}
export class getEmployeeByDocumentUseCase {
    constructor(private readonly PotentialService: PotentialService){}
    public static execute(document: string) {
        return PotentialService.getEmployeeByDocument(document)
    }
}