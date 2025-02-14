<template>
  <div class="flex flex-col items-center justify-center min-h-[40vh] p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
    <h2 class="text-2xl font-bold text-gray-700 mb-4">Descarga de Nómina</h2>
    <p class="text-gray-600 mb-6 text-center">Descarga el archivo Excel con la información de la nómina de manera rápida y sencilla.</p>
    <el-button type="primary" size="large" :loading="loading" @click="handleDownloadPayrollSlip">
      Descargar Excel
    </el-button>
    <p v-if="loading" class="text-sm text-gray-500 mt-4">Generando archivo, por favor espera...</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePayrollPaymentStore } from "@/presentation/stores/Payroll.store";

const payrollStore = usePayrollPaymentStore();
const loading = ref(false);

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
</script>

<style scoped>

</style>
