import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface"

export abstract class UserProfileRepository {
  abstract getUserProfile(userId: number): Promise<UserProfile>;
  abstract updateUserProfile(userProfile: UserProfile): Promise<void>;
};
