import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface";
import { UserProfileRepository } from "@/domain/repository/user/UserProfile.repository";
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

  async updateUserProfile(userProfile: UserProfile): Promise<UserProfile> {
    try {
      const response = await axiosInstance.put("/User/UpdateUserProfile", userProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data as UserProfile;
    } catch (error) {
      throw new Error("Unexpected error: " + error);
    }
  }
}
