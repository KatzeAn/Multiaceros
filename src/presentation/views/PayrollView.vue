<template>
  <div class="p-6 flex justify-center">
    <el-card class="shadow-xl w-full max-w-2xl bg-white rounded-lg border border-gray-200">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-4xl font-bold text-gray-600">Descarga de Nómina</h2>
          <el-button type="primary" size="large" @click="descargarNomina" :disabled="loading">
            Descargar Nómina
          </el-button>
        </div>
      </template>

      <div v-if="loading" class="text-center py-4">
        <p class="text-gray-600 mt-2">Cargando nómina...</p>
      </div>

      <div v-else-if="nomina" class="p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Información de Nómina</h3>

        <div class="mb-4 p-4 bg-white shadow rounded-lg">
          <h4 class="text-lg font-bold text-gray-700">{{ meses[nomina.month - 1] }} {{ nomina.year }}</h4>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Empleado:</strong> {{ nomina.fullName }}</p>
            <p><strong>Documento:</strong> {{ nomina.numberDocument }}</p>
            <p><strong>Cargo:</strong> {{ nomina.charge }}</p>
            <p><strong>Salario Básico:</strong> ${{ formatCurrency(nomina.basicSalary) }}</p>
            <p><strong>Días Trabajados:</strong> {{ nomina.daysWorkedInTheMonth }}</p>
          </div>

          <h3 class="text-lg font-semibold text-gray-800 mt-2">Ingresos</h3>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Salario:</strong> ${{ formatCurrency(nomina.salary) }}</p>
            <p><strong>Auxilio de Transporte:</strong> ${{ formatCurrency(nomina.transportationAssistance) }}</p>
            <p><strong>Beneficio:</strong> ${{ formatCurrency(nomina.valueBenefit) }}</p>
            <p><strong>Bonificaciones:</strong> ${{ formatCurrency(nomina.totalBonificationMonth) }}</p>
          </div>

          <h3 class="text-lg font-semibold text-gray-800 mt-2">Deducciones</h3>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Salud:</strong> ${{ formatCurrency(nomina.healthContribution) }}</p>
            <p><strong>Pensión:</strong> ${{ formatCurrency(nomina.pensionContribution) }}</p>
            <p><strong>Fondo de Solidaridad:</strong> ${{ formatCurrency(nomina.solidarityFundContribution) }}</p>
          </div>

          <h3 class="text-lg font-semibold text-gray-800 mt-2">Resumen</h3>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Total Ingresos:</strong> ${{ formatCurrency(nomina.totalIncome) }}</p>
            <p><strong>Total Deducciones:</strong> ${{ formatCurrency(nomina.totalDeductions) }}</p>
          </div>

          <p class="text-2xl font-bold py-4 text-center">
            Salario Neto a Pagar: ${{ formatCurrency(nomina.netPayable) }}
          </p>
        </div>
      </div>

      <div v-else class="text-center text-gray-600 py-4">
        <p>No hay información disponible.</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePayrollPaymentStore } from "@/presentation/stores/Payroll.store";
import { useUserStore } from "@/presentation/stores/user.store";

const payrollStore = usePayrollPaymentStore();
const userStore = useUserStore();
const loading = ref(false);
const nomina = ref(null);

const fetchNomina = async () => {
  loading.value = true;
  try {
    const response = await payrollStore.fetchPayrollPayments();

    if (!response || !response.length) {
      nomina.value = null;
      return;
    }

    const userId = parseInt(userStore.getUserId);

    nomina.value = response.find(n => n.userId === userId) || null;
  } catch (error) {
    console.error("Error al cargar la nómina:", error);
  } finally {
    loading.value = false;
  }
};

const descargarNomina = async () => {
  try {
    const userId = parseInt(userStore.getUserId);
    
    if (!userId) {
      return;
    }

    const response = await payrollStore.fetchPayrollSlip(userId);

    if (!response || !response.payrollSlip) {
      return;
    }

    const blob = response.payrollSlip; 
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Nomina.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al descargar la nómina:", error);
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value);
};

onMounted(fetchNomina);
</script>
