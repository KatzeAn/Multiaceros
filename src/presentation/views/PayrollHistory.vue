<template>
  <div class="p-6 flex justify-center">
    <el-card class="shadow-xl w-full max-w-lg bg-white rounded-lg border border-gray-200">
      <template #header>
        <h2 class="text-2xl font-bold text-gray-600 text-center">{{ t("title") }}</h2>
      </template>

      <div class="p-4">
        <el-form>
          <el-form-item :label="t('select_year')">
            <el-select v-model="selectedYear" :placeholder="t('year_placeholder')" class="w-full">
              <el-option v-for="year in availableYears" :key="year" :label="year" :value="year" />
            </el-select>
          </el-form-item>

          <el-form-item :label="t('select_month')">
            <el-select v-model="selectedMonth" :placeholder="t('month_placeholder')" class="w-full">
              <el-option v-for="(month, index) in months" :key="index" :label="t(`months.${month.value}`)" :value="month.value" />
            </el-select>
          </el-form-item>

          <el-button type="primary" size="large" @click="downloadPayrollSlip" :disabled="!selectedYear || !selectedMonth || loading">
            <el-icon v-if="loading" class="animate-spin"><Loading /></el-icon>
            {{ t("download_button") }}
          </el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { usePayrollPaymentStore } from "@/presentation/stores/Payroll.store";
import { useUserStore } from "@/presentation/stores/user.store";
import { ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const payrollStore = usePayrollPaymentStore();
const userStore = useUserStore();
const loading = ref(false);

// Obtener el año actual y generar una lista de los últimos 5 años
const currentYear = new Date().getFullYear();
const availableYears = computed(() => Array.from({ length: 1 }, (_, i) => currentYear - i));

// Meses disponibles
const months = [
  { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 },
  { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 },
  { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }
];

const selectedYear = ref<number | null>(null);
const selectedMonth = ref<number | null>(null);

const downloadPayrollSlip = async () => {
  if (!selectedYear.value || !selectedMonth.value) {
    ElNotification({
      title: t("error_title"),
      message: t("error_message"),
      type: "error",
    });
    return;
  }

  loading.value = true;
  try {
    const userId = parseInt(userStore.getUserId);
    if (!userId) {
      throw new Error("Usuario no encontrado");
    }

    await payrollStore.fetchPayrollSlip(userId, selectedYear.value, selectedMonth.value);
  } catch (error) {
    console.error("Error al descargar la nómina:", error);
    ElNotification({
      title: t("error_title"),
      message: t("notification_error"),
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.el-button {
  width: 100%;
}
</style>

  