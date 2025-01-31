import type { UserProfile } from "@/domain/Interfaces/UserProfile.interface";
import { GetUserProfileUseCase } from "@/domain/use-cases/UserProfile.usecase";
import { defineStore } from "pinia";

export const useUserProfileStore = defineStore('userProfile', () => {
    const fetchUserProfile = async (userId: string) => {
        const result = {
            loading: true,
            userProfile: null as UserProfile | null,
        };

        try {
            result.loading = true;
            const userProfileResponse: UserProfile = await GetUserProfileUseCase.execute(userId);
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
