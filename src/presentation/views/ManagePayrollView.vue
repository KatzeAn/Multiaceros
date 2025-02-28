<template>
  <div class="grid grid-cols-2 gap-6 p-6 justify-center">
    <!-- Sección izquierda (Descargas) -->
    <div class="flex flex-col gap-6">
      <!-- Descarga de Nómina -->
      <div class="card flex flex-col items-center justify-center max-w-[600px] w-full p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Descarga de Nómina</h2>
        <p class="text-gray-600 mb-6 text-center">Descarga el archivo Excel con la información de la nómina de manera rápida y sencilla.</p>

        <el-skeleton :loading="loading" animated>
          <template #template>
            <el-skeleton-item variant="text" style="width: 80%" />
            <el-skeleton-item variant="text" style="width: 60%" />
          </template>
          <template #default>
            <el-button type="primary" size="large" :loading="loading" @click="handleDownloadPayrollSlip">
              <el-icon class="mr-2"><Download /></el-icon> Descargar Excel
            </el-button>
          </template>
        </el-skeleton>
        <p v-if="loading" class="text-sm text-gray-500 mt-4">Generando archivo, por favor espera...</p>
      </div>

      <!-- Descarga de Cesantías e Intereses -->
      <div class="card flex flex-col items-center justify-center max-w-[600px] w-full p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Descarga de Cesantías e Intereses</h2>
        <p class="text-gray-600 mb-6 text-center">Descarga el archivo Excel con la información de cesantías e intereses fácilmente.</p>

        <el-skeleton :loading="loadingSeverance" animated>
          <template #template>
            <el-skeleton-item variant="text" style="width: 80%" />
            <el-skeleton-item variant="text" style="width: 60%" />
          </template>
          <template #default>
            <el-button type="primary" size="large" :loading="loadingSeverance" @click="handleDownloadSeverancePay">
              <el-icon class="mr-2"><Download /></el-icon> Descargar Excel
            </el-button>
          </template>
        </el-skeleton>
        <p v-if="loadingSeverance" class="text-sm text-gray-500 mt-4">Generando archivo, por favor espera...</p>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div class="card flex flex-col items-center justify-center max-w-[600px] w-full p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-700 mb-4">Distribución de Salarios</h2>
        <GraficSalary />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { usePayrollPaymentStore } from "@/presentation/stores/Payroll.store";
import { ElNotification } from "element-plus";
import { Download } from "@element-plus/icons-vue";
import GraficSalary from "@/presentation/components/graficSalary.vue";

const payrollStore = usePayrollPaymentStore();
const loading = ref(false);
const loadingSeverance = ref(false);

const notifyDownload = (message, type = "success") => {
  ElNotification({
    title: type === "success" ? "Descarga completada" : "Error",
    message,
    type,
  });
};

const handleDownloadPayrollSlip = async () => {
  loading.value = true;
  try {
    const result = await payrollStore.fetchDownloadPayrollSlip();
    if (!result.payrollSlip || !(result.payrollSlip instanceof Blob)) {
      notifyDownload("Error al descargar el archivo.", "error");
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
    notifyDownload("Archivo descargado correctamente.");
  } catch (error) {
    notifyDownload("Error al descargar el archivo.", "error");
  } finally {
    loading.value = false;
  }
};

const handleDownloadSeverancePay = async () => {
  loadingSeverance.value = true;
  try {
    const result = await payrollStore.fetchSeverancePayAndInterest();
    if (!result.severancePayFile || !(result.severancePayFile instanceof Blob)) {
      notifyDownload("Error al descargar el archivo.", "error");
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
    notifyDownload("Archivo descargado correctamente.");
  } catch (error) {
    notifyDownload("Error al descargar cesantías e intereses.", "error");
  } finally {
    loadingSeverance.value = false;
  }
};
</script>

<style scoped>
.card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}
</style>