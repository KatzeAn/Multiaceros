<template>
  <div class="flex flex-col items-center gap-6 p-6">
    <div class="flex flex-col items-center justify-center max-w-[600px] w-full p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-700 mb-4">Descarga de Nómina</h2>
      <p class="text-gray-600 mb-6 text-center">Descarga el archivo Excel con la información de la nómina de manera rápida y sencilla.</p>
      <el-button type="primary" size="large" :loading="loading" @click="handleDownloadPayrollSlip">
        Descargar Excel
      </el-button>
      <p v-if="loading" class="text-sm text-gray-500 mt-4">Generando archivo, por favor espera...</p>
    </div>

    <div class="flex flex-col items-center justify-center max-w-[600px] w-full p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-700 mb-4">Descarga de Cesantías e Intereses</h2>
      <p class="text-gray-600 mb-6 text-center">Descarga el archivo Excel con la información de cesantías e intereses fácilmente.</p>
      <el-button type="primary" size="large" :loading="loadingSeverance" @click="handleDownloadSeverancePay">
        Descargar Excel
      </el-button>
      <p v-if="loadingSeverance" class="text-sm text-gray-500 mt-4">Generando archivo, por favor espera...</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePayrollPaymentStore } from "@/presentation/stores/Payroll.store";

const payrollStore = usePayrollPaymentStore();
const loading = ref(false);
const loadingSeverance = ref(false);

const handleDownloadPayrollSlip = async () => {
  loading.value = true;
  try {
    const result = await payrollStore.fetchDownloadPayrollSlip();
    if (!result.payrollSlip) {
      console.error("No se recibió un archivo válido.");
      return;
    }
    if (!(result.payrollSlip instanceof Blob)) {
      console.error("La respuesta no es un Blob:", result.payrollSlip);
      return;
    }
    const url = window.URL.createObjectURL(result.payrollSlip);
    const a = document.createElement("a");
    a.href = url;
    a.download = "payroll.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
  } finally {
    loading.value = false;
  }
};

const handleDownloadSeverancePay = async () => {
  loadingSeverance.value = true;
  try {
    const result = await payrollStore.fetchSeverancePayAndInterest();
    if (!result.severancePayFile) {
      console.error("No se recibió un archivo válido.");
      return;
    }
    if (!(result.severancePayFile instanceof Blob)) {
      console.error("La respuesta no es un Blob:", result.severancePayFile);
      return;
    }
    const url = window.URL.createObjectURL(result.severancePayFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = "severance_pay_and_interest.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al descargar cesantías e intereses:", error);
  } finally {
    loadingSeverance.value = false;
  }
};
</script>

<style scoped>
</style>
