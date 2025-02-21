import { AuthModel } from "@/database/auth/auth.model";
import { User } from "@/domain/entities/user";
import type { AuthResponse } from "@/domain/repository/auth/auth.repository";
import { ElNotification } from "element-plus";
import { defineStore } from "pinia";
import { reactive, ref, watch, onMounted, onUnmounted } from "vue";

const loginFormInitialState = {
  email: "",
  password: "",
};

export const useAuthStore = defineStore("auth", () => {
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

      if (authResponse.status !== "Success") {
        throw new Error(authResponse.message || "Error en la autenticación");
      }

      if (!authResponse.userInfo || !authResponse.tokenInfo) {
        throw new Error(
          "La información del usuario o el token están ausentes."
        );
      }

      user.value = new User(
        authResponse.userInfo.id,
        authResponse.userInfo.firstName,
        authResponse.userInfo.lastName,
        authResponse.userInfo.email,
        authResponse.tokenInfo.accessToken,
        authResponse.userInfo.role.roleName
      );

      startInactivityTimer();

      return user.value;
    } catch (error) {
      errorMessage.value = error as string;
      resetLoginForm();
      throw errorMessage;
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
    resetInactivityTimer
  };
});
