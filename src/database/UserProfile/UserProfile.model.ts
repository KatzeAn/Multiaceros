import type { UserProfile } from "@/domain/Interfaces/UserProfile.interface";
import { UserProfileRepository } from "@/domain/repository/UserProfile.repository";
import axiosInstance from "@/presentation/api/axiosInstance";


export class UserProfileModel extends UserProfileRepository {
  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      const response = await axiosInstance.get(`/User/GetUserProfile/${userId}`);
      return response.data as UserProfile;
    } catch (error) {
        throw new Error("Unexpected error: " + error);
    }
  }
}
