import { UserProfileModel } from "@/database/user/UserProfile/UserProfile.model";
import { User } from "@/domain/entities/user";
import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserProfileStore = defineStore('userProfile', () => {
    const userProfile = ref<UserProfile | null>(null);
    const loading = ref<boolean>(false);

    const fetchUserProfile = async (userId: string) => {
        loading.value = true;
        try {
            const userServices = new UserProfileModel();
            const userProfileResponse: UserProfile = await userServices.getUserProfile(userId);
            userProfile.value = userProfileResponse; 
        } catch (error) {
            console.error('Error fetching user profile:', error);
            userProfile.value = null;
        } finally {
            loading.value = false;
        }
    };

    const updateUserProfile = async (updatedProfile: UserProfile) => {
        try {
            const userServices = new UserProfileModel();
            await userServices.updateUserProfile(updatedProfile);

            userProfile.value = updatedProfile;

            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData: User = JSON.parse(storedUser);
                userData.userFirstName = updatedProfile.userFirstName;
                userData.SurName = updatedProfile.surName;
                userData.UserEmail = updatedProfile.userEmail;

                localStorage.setItem('user', JSON.stringify(userData));
                ElNotification({
                    title: 'Éxito',
                    message: 'Perfil actualizado correctamente',
                    type: 'success',
                });
            }
        } catch (error) {
            ElNotification({
                title: 'Error',
                message: 'No se pudo actualizar el perfil. Inténtalo de nuevo.',
                type: 'error',
            });
        }
    };

    return {
        userProfile,
        loading,
        fetchUserProfile,
        updateUserProfile,
    };
});
