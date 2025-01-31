import { User } from '@/domain/entities/user';
import type { AuthResponse } from '@/domain/repository/auth/auth.repository';
import { LoginUseCase } from '@/domain/use-cases/login.usecase';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

const loginFormInitialState = {
  email: '',
  password: '',
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);

  const loginForm = reactive({ ...loginFormInitialState });

  const resetForm = () => {
    loginForm.password = loginFormInitialState.password;
  };

  const LoginWithEmailAndPassword = async () => {
    try {
      let authResponse: AuthResponse;
  
      authResponse = await LoginUseCase.execute(loginForm.email, loginForm.password);
  
      if (authResponse.status !== "Success") {
        throw new Error(authResponse.message);
      }
  
      if (!authResponse.userInfo || !authResponse.userInfo[0]) {
        throw new Error("User information is missing in the response.");
      }
  
      if (!authResponse.tokenInfo || !authResponse.tokenInfo[0]) {
        throw new Error("Token information is missing in the response.");
      }

      const userInfo = authResponse.userInfo[0];
      const tokenInfo = authResponse.tokenInfo[0];
  
      user.value = new User(
        userInfo.id,
        userInfo.firstName,
        userInfo.lastName,
        userInfo.email,
        tokenInfo.accessToken,
        userInfo.role.roleName
      );
  
      localStorage.setItem("user", JSON.stringify(user.value));
  
      return user.value;
    } catch (error) {
      resetForm();
      throw error;
    }
  };
  

  return {
    user,
    loginForm,
    LoginWithEmailAndPassword,
    resetForm,
  };
});