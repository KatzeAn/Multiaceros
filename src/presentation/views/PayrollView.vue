<template>
    <div class="p-6 flex justify-center">
      <el-card class="shadow-xl w-full max-w-2xl bg-white rounded-lg border border-gray-200">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-4xl font-bold text-gray-600">Descarga de Nómina</h2>
            <el-button type="primary" size="large" @click="descargarNomina" :disabled="!nomina">
              Descargar Nómina
            </el-button>
          </div>
        </template>
  
        <!-- Contenedor de Nómina -->
        <div v-if="loading" class="text-center py-4">
          <el-spinner size="large" />
          <p class="text-gray-600 mt-2">Cargando nómina...</p>
        </div>
  
        <div v-else-if="nomina && nomina.length > 0" class="p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Información de Nómina</h3>
  
          <div v-for="(item, index) in nomina" :key="index" class="mb-4 p-4 bg-white shadow rounded-lg">
            <h4 class="text-lg font-bold text-gray-700">{{ meses[item.month - 1] }} {{ item.year }}</h4>
            <div class="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Empleado:</strong> {{ item.fullName }}</p>
              <p><strong>Documento:</strong> {{ item.numberDocument }}</p>
              <p><strong>Cargo:</strong> {{ item.charge }}</p>
              <p><strong>Salario Básico:</strong> ${{ formatCurrency(item.basicSalary) }}</p>
              <p><strong>Días Trabajados:</strong> {{ item.daysWorkedInTheMonth }}</p>
            </div>
  
            <h3 class="text-lg font-semibold text-gray-800 mt-2">Ingresos</h3>
            <div class="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Salario:</strong> ${{ formatCurrency(item.salary) }}</p>
              <p><strong>Auxilio de Transporte:</strong> ${{ formatCurrency(item.transportationAssistance) }}</p>
              <p><strong>Beneficio:</strong> ${{ formatCurrency(item.valueBenefit) }}</p>
              <p><strong>Bonificaciones:</strong> ${{ formatCurrency(item.totalBonificationMonth) }}</p>
            </div>
  
            <h3 class="text-lg font-semibold text-gray-800 mt-2">Deducciones</h3>
            <div class="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Salud:</strong> ${{ formatCurrency(item.healthContribution) }}</p>
              <p><strong>Pensión:</strong> ${{ formatCurrency(item.pensionContribution) }}</p>
              <p><strong>Fondo de Solidaridad:</strong> ${{ formatCurrency(item.solidarityFundContribution) }}</p>
            </div>
  
            <h3 class="text-lg font-semibold text-gray-800 mt-2">Resumen</h3>
            <div class="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Total Ingresos:</strong> ${{ formatCurrency(item.totalIncome) }}</p>
              <p><strong>Total Deducciones:</strong> ${{ formatCurrency(item.totalDeductions) }}</p>
            </div>
  
            <p class="text-2xl font-bold py-4 text-center">
              Salario Neto a Pagar: ${{ formatCurrency(item.netPayable) }}
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
  
  const payrollStore = usePayrollPaymentStore();
  const loading = ref(false);
  const nomina = ref(null);
  
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const fetchNomina = async () => {
    loading.value = true;
    const response = await payrollStore.fetchPayrollPayments();
    nomina.value = response.payrollPayments || [];
    loading.value = false;
  };
  
  const descargarNomina = () => {
    alert("Descargando nómina...");
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value);
  };
  
  onMounted(fetchNomina);
  </script>
  
  <style scoped>
  .el-card {
    max-width: 750px;
    margin: auto;
  }
  </style>
  