import { ref, computed, reactive, watch, onMounted } from "vue";
import { useAuthStore } from "../stores/auth.store";
import { ElNotification, type FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export function useResetPasswordViewModel() {
  const authStore = useAuthStore();
  const isLoading = computed(() => authStore.isLoading);
  const errorMessage = ref<string | null | undefined>(null);
  const { t } = useI18n();

  const ruleFormRef = ref<FormInstance>();

  const validateConfirmPassword = (
    rule: any,
    value: string,
    callback: (error?: Error) => void
  ) => {
    if (value !== form.newPassword) {
      callback(new Error(t("password_reset.validation.passwords_mismatch")));    } else {
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
        message: t("password_reset.validation.required_new_password"),
        trigger: "blur",
      },
      {
        min: 4,
        max: 64,
        message: t("password_reset.validation.length"),
        trigger: "blur",
      },
      {
        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+\-=\[\]{}|\\:;"'<>,.?/~`])[A-Za-z\d!@#$%^&*()+\-=\[\]{}|\\:;"'<>,.?/~`]+$/,
        message: t("password_reset.validation.pattern"),
        trigger: "blur",
      },
    ],
    confirmPassword: [
      {
        required: true,
        message: t("password_reset.validation.required_confirm_password"),
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
        title: t("notifications.success.title"),
        message:t("notifications.success.password_set"),
        type: "success",
      });

      return true;
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
    isLoading,
    ruleFormRef,
    rules,
    submitForm,
    form,
  };
}
