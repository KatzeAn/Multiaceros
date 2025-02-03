import { UserProfileService } from "@/services/UserProfile.service";
export class GetUserProfileUseCase {
    constructor(private readonly userProfileService: UserProfileService) {}

    public static execute(userId: string) {
        return UserProfileService.getUserProfile(userId); 
}
}
