import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";
import type { FamilyCompesationFundsRepository } from "@/domain/repository/familyCompesationFunds/familyCompesationFunds.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class FamilyCompesationFundsModel
  implements FamilyCompesationFundsRepository
{
  getFamilyCompesationFunds(isActive: boolean): Promise<FamilyCompesationFunds[]> {
    return apiRequest<FamilyCompesationFunds[]>( "get",`/FamilyCompesationFunds?isActive=${isActive}`);
  }
  createFamilyCompesationFunds(
    data: FamilyCompesationFunds
  ): Promise<FamilyCompesationFunds> {
    return apiRequest<FamilyCompesationFunds>(
      "post",
      "FamilyCompesationFunds/CreateFamilyCompesationFunds",
      {
        CompensationFundName: data.compensationFundName,
        CreatedBy: data.createdBy,
      }
    );
  }
  updateFamilyCompensationFunds(id: number,compensationFundName: string, modifiedBy: string): Promise<FamilyCompesationFunds> {
    return apiRequest<FamilyCompesationFunds>("put", "/FamilyCompesationFunds/UpdateFamilyCompesationFunds",{id, compensationFundName, modifiedBy});
}
  deleteFamilyCompesationFunds(compesationfundsID: number, modifiedBy: string): Promise<FamilyCompesationFunds> {
    return apiRequest<FamilyCompesationFunds>(
        "patch",
        `/FamilyCompesationFunds/DeleteFamilyCompesationFunds?compesationfundsID=${compesationfundsID}&modifiedBy=${modifiedBy}`
    );
}

}
