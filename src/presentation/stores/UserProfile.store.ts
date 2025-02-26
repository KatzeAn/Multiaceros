import { UserProfileModel } from "@/database/user/UserProfile/UserProfile.model";
import { User } from "@/domain/entities/user";
import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

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

    const updateUserProfile = async (userProfile: UserProfile) => {
        try {
            const userServices = new UserProfileModel();
            await userServices.updateUserProfile(userProfile);
            const storedUser = localStorage.getItem('user');
            const user = ref<User | null>(null);

            if (storedUser) {
              const userData : User = JSON.parse(storedUser);

              user.value = new User(
                userData.userId,
                userData.userFirstName,
                userData.SurName,
                userData.UserEmail,
                userData.token,
                userData.role
              );

              user.value.userFirstName = userProfile.userFirstName;
              user.value.SurName = userProfile.surName;
              user.value.UserEmail = userProfile.userEmail;

              localStorage.removeItem('user');
              localStorage.setItem('user', JSON.stringify(user.value));
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
        fetchUserProfile,
        updateUserProfile,
    };
});
