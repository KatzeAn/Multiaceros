import { UserProfileModel } from "@/database/UserProfile/UserProfile.model";
import type { UserProfile } from "@/domain/Interfaces/UserProfile.interface";

export class UserProfileService {
    public static  getUserProfile(userId: string): Promise<UserProfile> 
    {
        return new UserProfileModel().getUserProfile(userId);
    }
}
