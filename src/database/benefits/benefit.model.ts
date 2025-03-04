import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";
import type { BenefitRepository } from "@/domain/repository/benefits/benefit.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class BenefitModel implements BenefitRepository {
  getBenefits(isActive: boolean): Promise<Benefits[]> {
    return apiRequest<Benefits[]>("get", `/Benefits?isActive=${isActive}`);
  }
  createBenefit(data: Benefits): Promise<Benefits> {
    return apiRequest<Benefits>("post", "/Benefits/CreateBenefits", { NameBenefit: data.nameBenefit, CreatedBy: data.createdBy });
  }
  updateBenefit(id: number, nameBenefit: string, modifiedBy: string): Promise<Benefits> {
    return apiRequest<Benefits>("put","/Benefits/UpdateBenefits",{ id, nameBenefit, modifiedBy });
  }
  
  deleteBenefit(benefitID: number, modifiedBy: string): Promise<Benefits> {
    return apiRequest<Benefits>("patch", `/Benefits/BenefitsDelete?benefitID=${benefitID}&modifiedBy=${modifiedBy}`
    );
}

}
