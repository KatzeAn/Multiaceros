import { AuthModel } from '@/database/auth/auth.model';
import { User } from '@/domain/entities/user';
import type { AuthResponse } from '@/domain/repository/auth/auth.repository';
import type { ApiErrorResponse } from '@/domain/Interfaces/ApiErrorResponse.interface';
import axios from 'axios';
import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';

// Estado inicial del formulario de login
const loginFormInitialState = {
  email: '',
  password: '',
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const errorMessage = ref<string | null | undefined>(null);
  const loginForm = reactive({ ...loginFormInitialState });

  // Resetear el formulario de login
  const resetLoginForm = () => {
    Object.assign(loginForm, loginFormInitialState);
  };

  // Login con email y password
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

      // Crear la instancia del usuario
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
