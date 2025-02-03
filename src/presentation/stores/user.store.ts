import { User } from "@/domain/entities/user";
import type { AbsenceRequest } from "@/domain/Interfaces/Absence/AbsenceRequest.interface";
import { GetBirthdaysOfMonthUseCase } from "@/domain/use-cases/getBirthdaysOfMonth.usecase";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

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
    
    const getUserId = computed(() => {
        return user.value ? `${user.value.userId }`: '';
    });

    const fetchBirthdaysOfMonth = async () => {
        const result = {
            loading: true,
            userBirthdaysList: [] as UserBirthdayList
        };
    
        try {
            result.loading = true; // Activar indicador de carga
            const birthdaysResponse: UserBirthdayList = await GetBirthdaysOfMonthUseCase.execute();
            result.userBirthdaysList = birthdaysResponse; // Asignar datos obtenidos
        } catch (error) {
            console.error('Error fetching birthdays:', error);
            result.userBirthdaysList = []; // En caso de error, lista vacía
        } finally {
            result.loading = false; // Detener la carga
        }
    
        return result; // Retornar el estado y los datos
    };

    return {
        isAuthenticated,
        getUsername,
        getUserId,
        fetchBirthdaysOfMonth,
    }
});
