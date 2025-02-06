import { UserProfileModel } from "@/database/user/UserProfile/UserProfile.model";
import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface";
import { defineStore } from "pinia";

export const useUserProfileStore = defineStore('userProfile', () => {
    const fetchUserProfile = async (userId: string) => {
        const result = {
            loading: true,
            userProfile: null as UserProfile | null,
        };

        try {
            result.loading = true;
            const userServices = new UserProfileModel();
            const userProfileResponse: UserProfile = await userServices.getUserProfile(userId);
            result.userProfile = userProfileResponse; 
        } catch (error) {
            console.error('Error fetching user profile:', error);
            result.userProfile = null;  
        } finally {
            result.loading = false;
        }

        return result;
    };

    return {
        fetchUserProfile,
    };
});
