import { UserModel } from "@/database/auth/user.model";
import type { AbsenceRequest } from "@/domain/Interfaces/AbsenceRequest.interface";

export class UserService {
    public static createAbsenceRequest(from: string, to: string, type: string, evidencePath: string, comment: string, requestedById: string): Promise<AbsenceRequest> {
        return new UserModel().createAbsenceRequest(from, to, type, evidencePath, comment, requestedById);
    }
}