import { UserModel } from "@/database/user/user.model";
import { User } from "@/domain/entities/user";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null);

    const loadFromLocalStorage = () => {
        const storedUser = localStorage.getItem('user');
    
        if (storedUser) {
          const userData = JSON.parse(storedUser);
    
          user.value = new User(
            userData.userId,
            userData.userFirstName,
            userData.SurName,
            userData.UserEmail,
            userData.Token,
            userData.Role
          );
        }
    };
    
    loadFromLocalStorage();

    const isAuthenticated = computed(() => {
        return user.value ? true: false;
    });
    
    const getUsername = computed(() => {
        return user.value ? `${user.value.userFirstName } ${user.value.SurName}`: '';
    });

    const getUserEmail = computed(() => {
        return user.value ? `${user.value.UserEmail }`: '';
    }); 
    
    const getUserId = computed(() => {
        return user.value ? `${user.value.userId }`: '';
    });

    const fetchBirthdaysOfMonth = async () => {
        const result = {
            loading: true,
            userBirthdaysList: [] as UserBirthdayList
        };
    
        try {
            result.loading = true;
            const userService = new UserModel();
            const birthdaysResponse: UserBirthdayList = await userService.getBirthdaysOfMonth();
            result.userBirthdaysList = birthdaysResponse;
        } catch (error) {
            console.error('Error fetching birthdays:', error);
            result.userBirthdaysList = [];
        } finally {
            result.loading = false;
        }
    
        return result;
    };

    return {
        isAuthenticated,
        getUsername,
        getUserEmail,
        getUserId,
        fetchBirthdaysOfMonth,
    }
});
