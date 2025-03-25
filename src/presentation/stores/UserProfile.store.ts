import { UserProfileModel } from "@/database/user/UserProfile/UserProfile.model";
import { User } from "@/domain/entities/user";
import type { UserProfile } from "@/domain/Interfaces/user/UserProfile.interface";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n"; 


export const useUserProfileStore = defineStore('userProfile', () => {
    const { t } = useI18n();
    const userProfile = ref<UserProfile | null>(null);
    const loading = ref<boolean>(false);
    const errorMessage = ref<string | null | undefined>(null);

    const fetchUserProfile = async (userId: string) => {
        loading.value = true;
        try {
            const userServices = new UserProfileModel();
            const userProfileResponse: UserProfile = await userServices.getUserProfile(userId);
            userProfile.value = userProfileResponse; 
        } catch (error) {
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
                    title: t("notifications.success.title"),
                    message: t("notifications.success.profileUpdated"),
                    type: "success",
                  });
            }
        } catch (error: any) {
            errorMessage.value = error as string;
            ElNotification({
                title: t("notifications.error.title"),
                message: errorMessage.value,
                type: "error",
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
