import type { UserProfile } from "@/domain/Interfaces/UserProfile.interface"

export abstract class UserProfileRepository {
  abstract getUserProfile(userId: string): Promise<UserProfile>;
};
