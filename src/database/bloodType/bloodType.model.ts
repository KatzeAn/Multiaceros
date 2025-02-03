import type { BloodType } from "@/domain/Interfaces/BloodType/bloodType.interface";
import type { BloodTypeRepository } from "@/domain/repository/bloodType/bloodType.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class BloodTypeModel implements BloodTypeRepository {
    getBloodTypes(): Promise<BloodType[]> {
        return apiRequest<BloodType[]>("get", "/BloodType");
    }
}