import { AuthModel } from "@/database/auth/auth.model";
import { User } from "@/domain/entities/user";
import type { AuthResponse } from "@/domain/repository/auth/auth.repository";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { reactive, ref, watch, onMounted, onUnmounted } from "vue";
import jwtDecode from 'jwt-decode';
import { useI18n } from "vue-i18n"; 


const loginFormInitialState = {
  email: "",
  password: "",
};

export const useAuthStore = defineStore("auth", () => {
    const { t } = useI18n();
  const isLoading = ref(false);
  const user = ref<User | null>(null);
  const errorMessage = ref<string | null | undefined>(null);
  const loginForm = reactive({ ...loginFormInitialState });

  let inactivityTimeout: ReturnType<typeof setTimeout> | null = null;

  // Resetear formulario de login
  const resetLoginForm = () => {
    Object.assign(loginForm, loginFormInitialState);
  };

  const resetPassword = async (email: string) => {
    try {
      const authService = new AuthModel();
      return await authService.resetPassword(email);
    } catch (error) {
      errorMessage.value = error as string;
      throw errorMessage;
    }
  };

  const confirmResetPassword = async (token: string, newPassword: string) => {
    try {
      const authService = new AuthModel();
      return await authService.confirmPasswordReset(token, newPassword);
    } catch (error) {
      errorMessage.value = error as string;
      throw errorMessage;
    }
  };

  const loginWithEmailAndPassword = async () => {
    try {
      const authService = new AuthModel();
      const authResponse: AuthResponse =
        await authService.signInWithEmailAndPassword(
          loginForm.email,
          loginForm.password
        );
  
      if (authResponse && authResponse.accessToken) {
        const token = authResponse.accessToken;
        const decodedToken = jwtDecode(token);
        user.value = new User(
          decodedToken.sub, 
          null,
          null,
          decodedToken.email, 
          token,
          decodedToken.role 
        );
  
        startInactivityTimer();
  
        return user.value;
      } else {
        throw new Error("Error en la autenticación: respuesta del servidor inválida.");
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : String(error);
      resetLoginForm();
      throw new Error(errorMessage.value);
    }
  };


  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    window.location.replace("/");
};

  const startInactivityTimer = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    
    inactivityTimeout = setTimeout(() => {
      ElNotification({
        title: "Warning",
        message: "You have been inactive for 5 minutes. Please log in again.",
        type: "warning",
      });
      logout();
      window.location.replace("/");
    }, 5 * 60 * 1000); // 5 minutes
  };

  const resetInactivityTimer = () => {
    startInactivityTimer();
  };

  onMounted(() => {
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", resetInactivityTimer);
    window.removeEventListener("keydown", resetInactivityTimer);
    window.removeEventListener("click", resetInactivityTimer);
  });

  // Sincronizar usuario con localStorage automáticamente
  watch(
    user,
    (newUser) => {
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
        startInactivityTimer();
      } else {
        localStorage.removeItem("user");
      }
    },
    { deep: true }
  );

  const signInWithGoogle = async () => {
    try {
      const authService = new AuthModel();
      await authService.signInWithGoogle();
    } catch (error) {
      errorMessage.value = error as string;
      throw errorMessage;
    }
  };

  const handleGoogleCallback = async (code: string) => {
    try {
      const authService = new AuthModel();
      const authResponse = await authService.handleGoogleCallback(code);

      const token = authResponse.accessToken;
      const decodedToken = jwtDecode(token);

      user.value = new User(
        decodedToken.sub, 
        null,
        null,
        decodedToken.email,
        token,
        decodedToken.role 
      );

      localStorage.setItem("user", JSON.stringify(user.value)); 
      startInactivityTimer();
      return user.value;
    } catch (error) {
      errorMessage.value = error as string;
      ElNotification({
        title: t("notifications.error.title"),
        message: errorMessage.value,
        type: "error",
      });
    }
  };


  return {
    isLoading,
    user,
    errorMessage,
    loginForm,
    loginWithEmailAndPassword,
    logout,
    resetLoginForm,
    resetPassword,
    confirmResetPassword,
    resetInactivityTimer,
    signInWithGoogle, 
    handleGoogleCallback, 
  };
});
