import type { BloodType } from "@/domain/Interfaces/BloodType/bloodType.interface";

export abstract class BloodTypeRepository {
    abstract getBloodTypes(isActive?: boolean): Promise<BloodType[]>;
}