import { UserService } from "@/services/user.service";

export class CreateAbsenceRequestUseCase {
    constructor(private readonly userService: UserService){}

    public static execute(from: string, to: string, type: string, evidencePath: string, comment: string, requestedById: string) {
        return UserService.createAbsenceRequest(from, to, type, evidencePath, comment, requestedById)
    }
}