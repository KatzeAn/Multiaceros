<template>
  <form
    class="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 relative"
    @submit.prevent="login()"
  >
    <div class="absolute top-4 right-4">
      <LanguageSwitcher />
    </div>

    <h1 class="text-5xl font-semibold">{{ t("portalMultiaceros") }}</h1>
    <p class="font-medium text-lg text-gray-500 mt-4">
      {{ t("welcome") }}
    </p>
    <div class="mt-8">
      <div>
        <label class="text-lg font-medium" for="form-email">{{ t("email") }}</label>
        <input
          v-model="loginForm.email"
          type="email"
          id="form-email"
          class="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          :placeholder="t('enterEmail')"
          required
        />
      </div>
      <div>
        <label class="text-lg font-medium" for="form-password">{{ t("password") }}</label>
        <input
          v-model="loginForm.password"
          type="password"
          id="form-password"
          class="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          :placeholder="t('enterPassword')"
          required
        />
      </div>
      <div class="mt-8 items-center">
        <a
          class="font-medium text-base text-secondary cursor-pointer"
          @click="dialogFormVisible = true"
        >
          {{ t("forgotPassword") }}
        </a>
      </div>
      <div class="mt-8 flex flex-col gap-y-4">
        <button
          v-loading="isLoading"
          type="submit"
          class="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-secondary text-white text-lg font-bold"
        >
          {{ t("logIn") }}
        </button>
        <button 
            @click="signInWithGoogle"
            type="button"
            class="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 text-gray-700 text-lg font-medium hover:bg-gray-100 transition-all"
          >
            <font-awesome-icon :icon="['fab', 'google']" class="text-blue-900 text-xl" />
            {{ t("google") }}
          </button>
      </div>
    </div>
    <p class="ml-2 font-medium text-base">
      {{ t("wantToWork") }}
      <router-link
        to="/applications"
        class="font-medium text-base text-secondary cursor-pointer"
      >
        {{ t("clickHere") }}
      </router-link>
    </p>
  </form>
  <el-dialog
    v-model="dialogFormVisible"
    :title="t('resetPassword')"
    width="500"
  >
    <el-form :model="form">
      <el-form-item :label="t('emailAddress')" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ t("cancel") }}</el-button>
        <el-button type="primary" @click="resetPasswordHandler">
          {{ t("confirm") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import LanguageSwitcher from "@/presentation/components/LanguageSwitcher.vue"
import { useAuthStore } from "../stores/auth.store";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const { loginWithEmailAndPassword, loginForm, resetLoginForm, resetPassword, handleGoogleCallback, signInWithGoogle } = useAuthStore();
const errorMessage = ref<string | null | undefined>(null);

const router = useRouter();
const isLoading = ref(false);
const dialogFormVisible = ref(false);

const formLabelWidth = "140px";

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const login = async () => {
  isLoading.value = true;
  try {
    const user = await loginWithEmailAndPassword();
    if (user && user.token) {
      window.location.href = "/home";
    } else {
      throw new Error("Token de acceso no recibido.");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(errorMessage);

    ElNotification({
      title: "Error de autenticación",
      message: errorMessage,
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
const resetPasswordHandler = async () => {
  try {
    const email = form.name;
    const response = await resetPassword(email);
    
    ElNotification({
      title: t("notifications.success.title"),
      message: t("notifications.success.recovery_email_sent"),
      type: "success",
    });
    dialogFormVisible.value = false; 
 } catch (error: any) {
       errorMessage.value = error as string;
       ElNotification({
         title: t("notifications.error.title"),
         message: errorMessage.value,
         type: "error",
       });
     }
};

onMounted(() => {
  resetLoginForm();
});
</script>
<style></style>
