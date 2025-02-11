import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";
import type { BenefitRepository } from "@/domain/repository/benefits/benefit.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class BenefitModel implements BenefitRepository {
  getBenefits(): Promise<Benefits[]> {
    return apiRequest<Benefits[]>("get", "/Benefits/GetBenefits");
  }
  createBenefit(data: Benefits): Promise<Benefits> {
    return apiRequest<Benefits>("post", "/Benefits/CreateBenefits", { NameBenefit: data.nameBenefit, CreatedBy: data.createdBy });
  }
  updateBenefit(data: Benefits): Promise<Benefits> {
    return apiRequest<Benefits>("put", "/Benefits/UpdateBenefits", { data });
  }
  deleteBenefit(id: number, modifiedBy: string): Promise<Benefits> {
    return apiRequest<Benefits>("delete", `/Benefits/DeleteBenefits/${id}`, {
      data: { id, modifiedBy },
    });
  }
}
