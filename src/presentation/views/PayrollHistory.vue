<template>
    <div class="p-6 flex justify-center">
      <el-card class="shadow-xl w-full max-w-lg bg-white rounded-lg border border-gray-200">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-600 text-center">Descargar Historial de Nómina</h2>
        </template>
  
        <div class="p-4">
          <el-form>
            <el-form-item label="Selecciona el año">
              <el-select v-model="selectedYear" placeholder="Año" class="w-full">
                <el-option v-for="year in availableYears" :key="year" :label="year" :value="year" />
              </el-select>
            </el-form-item>
  
            <el-form-item label="Selecciona el mes">
              <el-select v-model="selectedMonth" placeholder="Mes" class="w-full">
                <el-option v-for="(month, index) in months" :key="index" :label="month.label" :value="month.value" />
              </el-select>
            </el-form-item>
  
            <el-button type="primary" size="large" @click="downloadPayrollSlip" :disabled="!selectedYear || !selectedMonth || loading">
              <el-icon v-if="loading" class="animate-spin"><Loading /></el-icon>
              Descargar Nómina
            </el-button>
          </el-form>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { usePayrollPaymentStore } from "@/presentation/stores/Payroll.store";
  import { useUserStore } from "@/presentation/stores/user.store";
  import { ElNotification } from "element-plus";
  
  const payrollStore = usePayrollPaymentStore();
  const userStore = useUserStore();
  const loading = ref(false);
  
  // Obtener el año actual y generar una lista de los últimos 5 años
  const currentYear = new Date().getFullYear();
  const availableYears = computed(() => Array.from({ length: 1 }, (_, i) => currentYear - i));
  
  // Meses disponibles
  const months = [
    { label: "Enero", value: 1 },
    { label: "Febrero", value: 2 },
    { label: "Marzo", value: 3 },
    { label: "Abril", value: 4 },
    { label: "Mayo", value: 5 },
    { label: "Junio", value: 6 },
    { label: "Julio", value: 7 },
    { label: "Agosto", value: 8 },
    { label: "Septiembre", value: 9 },
    { label: "Octubre", value: 10 },
    { label: "Noviembre", value: 11 },
    { label: "Diciembre", value: 12 },
  ];
  
  const selectedYear = ref(null);
  const selectedMonth = ref(null);
  
  const downloadPayrollSlip = async () => {
    if (!selectedYear.value || !selectedMonth.value) {
      ElNotification({
        title: "Error",
        message: "Debes seleccionar el año y el mes antes de descargar",
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
        title: "Error",
        message: "Ocurrió un error al descargar la nómina",
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
  