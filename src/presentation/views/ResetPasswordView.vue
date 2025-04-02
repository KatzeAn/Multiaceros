<template>
  <main>
    <div class="h-screen w-full flex justify-center items-center">
      <el-card class="p-9 max-w-[550px]" style="border-radius: 0.5rem">
        <template #header>
          <div class="flex flex-col items-center">
            <h2 class="text-3xl font-bold">{{ t("password_reset.title") }}</h2>
            <span class="text-lg text-center my-2 text-gray-500 font-medium">
              {{ t("password_reset.subtitle") }}
            </span>
          </div>
        </template>
        <el-form
          :model="form"
          ref="ruleFormRef"
          :rules="rules"
          label-width="auto"
          label-position="top"
          class="space-y-12"
        >
          <el-form-item :label="t('password_reset.form.new_password')" prop="newPassword">
            <el-input
              size="large"
              type="password"
              show-password
              v-model="form.newPassword"
            />
          </el-form-item>
          <el-form-item :label="t('password_reset.form.confirm_password')" prop="confirmPassword">
            <el-input
              size="large"
              type="password"
              show-password
              v-model="form.confirmPassword"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="isLoading"
              type="primary"
              size="large"
              class="w-full"
              @click="handleSubmit"
            >
              {{ t("password_reset.form.submit_button") }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useResetPasswordViewModel } from "../viewmodels/resetPasswordViewModel";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const route = useRoute();
const router = useRouter();
const token = route.query.token as string;

const handleSubmit = async () => {
  const success = await submitForm(ruleFormRef.value, token);
  if (success) {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }
};

const { isLoading, ruleFormRef, rules, submitForm, form } =
  useResetPasswordViewModel();
</script>
