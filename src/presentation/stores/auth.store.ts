import { AuthModel } from '@/database/auth/auth.model';
import { User } from '@/domain/entities/user';
import type { AuthResponse } from '@/domain/repository/auth/auth.repository';
import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';

const loginFormInitialState = {
  email: '',
  password: '',
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const errorMessage = ref<string | null | undefined>(null);
  const loginForm = reactive({ ...loginFormInitialState });

  const resetLoginForm = () => {
    Object.assign(loginForm, loginFormInitialState);
  };

  const loginWithEmailAndPassword = async () => {
    try {
      const authService = new AuthModel();
      const authResponse: AuthResponse = await authService.signInWithEmailAndPassword(
        loginForm.email,
        loginForm.password
      );

      if (authResponse.status !== 'Success') {
        throw new Error(authResponse.message || 'Error en la autenticación');
      }

      if (!authResponse.userInfo || !authResponse.tokenInfo) {
        throw new Error('La información del usuario o el token están ausentes.');
      }

      user.value = new User(
        authResponse.userInfo.id,
        authResponse.userInfo.firstName,
        authResponse.userInfo.lastName,
        authResponse.userInfo.email,
        authResponse.tokenInfo.accessToken,
        authResponse.userInfo.role.roleName
      );

      return user.value;
    } catch (error) {
      errorMessage.value = error as string;
      resetLoginForm();
      throw errorMessage;
    }
  };

  // Logout
  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  // Sincronizar usuario con localStorage automáticamente
  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  }, { deep: true });

  return {
    user,
    errorMessage,
    loginForm,
    loginWithEmailAndPassword,
    logout,
    resetLoginForm,
  };
});
