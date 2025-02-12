import { ref, computed, reactive, watch, onMounted } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { ElNotification, type FormInstance } from "element-plus";
import { useRouter } from "vue-router";

export function useResetPasswordViewModel() {
  const authStore = useAuthStore();
  const isLoading = computed(() => authStore.isLoading);

  const ruleFormRef = ref<FormInstance>();

  const validateConfirmPassword = (
    rule: any,
    value: string,
    callback: (error?: Error) => void
  ) => {
    if (value !== form.newPassword) {
      callback(new Error("Las contraseñas no coinciden"));
    } else {
      callback();
    }
  };

  interface FormData {
    newPassword: string;
    confirmPassword: string;
    token: string;
  }

  const form = reactive<FormData>({
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  const rules = reactive({
    newPassword: [
      {
        required: true,
        message: "Por favor ingresa una nueva contraseña",
        trigger: "blur",
      },
      {
        min: 4,
        max: 64,
        message: "La contraseña debe tener entre 4 y 64 caracteres",
        trigger: "blur",
      },
      {
        pattern:
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+\-=\[\]{}|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()+\-=\[\]{}|\\:;"'<>,.?/~`]+$/,
        message:
          "La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial",
        trigger: "blur",
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: "Por favor confirma tu nueva contraseña",
        trigger: "blur",
      },
      { validator: validateConfirmPassword, trigger: "blur" },
    ],
  });

  const submitForm = async (
    formEl: FormInstance | undefined,
    token: string
  ) => {
    if (!formEl) return;
    const router = useRouter();
    try {
      await formEl.validate();

      form.token = token;
      const response = await authStore.confirmResetPassword(
        form.token,
        form.newPassword
      );
      console.log(response);

      ElNotification({
        title: "Éxito",
        message: "contraseña restablecida correctamente",
        type: "success",
      });

      return true;
    } catch (error) {
      const errorMessage = error as string;
      ElNotification({
        title: "Error",
        message: errorMessage,
        type: "error",
      });
    }
  };

  return {
    isLoading,
    ruleFormRef,
    rules,
    submitForm,
    form,
  };
}
