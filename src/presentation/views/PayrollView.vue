<template>
  <div class="p-6 flex justify-center">
    <el-card class="shadow-xl w-full max-w-2xl bg-white rounded-lg border border-gray-200">
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-4xl font-bold text-gray-600">{{ t('previewPayroll') }}</h2>
          <div class="flex gap-2"></div>
        </div>
      </template>

      <div v-if="loading" class="text-center py-4">
        <p class="text-gray-600 mt-2">{{ t('loadingPayroll') }}</p>
      </div>

      <div v-else-if="nomina && nomina.length" class="p-6 border border-gray-300 rounded-lg bg-gray-100 shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ t('payrollInfo') }}</h3>

        <div v-for="empleado in nomina" :key="empleado.user" class="mb-6 p-4 bg-white rounded-lg shadow-md blurred">
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>{{ t('employee') }}:</strong> {{ empleado.fullName }}</p>
            <p><strong>{{ t('document') }}:</strong> {{ empleado.numberDocument }}</p>
            <p><strong>{{ t('position') }}:</strong> {{ empleado.charge }}</p>
            <p><strong>{{ t('basicSalary') }}:</strong> {{ formatCurrency(empleado.basicSalary) }}</p>
            <p><strong>{{ t('daysWorked') }}:</strong> {{ empleado.daysWorkedInTheMonth }}</p>
          </div>

          <h3 class="text-lg font-semibold text-gray-800 mt-2">{{ t('income') }}</h3>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>{{ t('salary') }}:</strong> {{ formatCurrency(empleado.salary) }}</p>
            <p><strong>{{ t('transportAssistance') }}:</strong> {{ formatCurrency(empleado.transportationAssistance) }}</p>
            <p><strong>{{ t('benefit') }}:</strong> {{ formatCurrency(empleado.valueBenefit) }}</p>
            <p><strong>{{ t('bonuses') }}:</strong> {{ formatCurrency(empleado.totalBonificationMonth) }}</p>
          </div>

          <h3 class="text-lg font-semibold text-gray-800 mt-2">{{ t('deductions') }}</h3>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>{{ t('health') }}:</strong> {{ formatCurrency(empleado.healthContribution) }}</p>
            <p><strong>{{ t('pension') }}:</strong> {{ formatCurrency(empleado.pensionContribution) }}</p>
            <p><strong>{{ t('solidarityFund') }}:</strong> {{ formatCurrency(empleado.solidarityFundContribution) }}</p>
          </div>

          <h3 class="text-lg font-semibold text-gray-800 mt-2">{{ t('summary') }}</h3>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>{{ t('totalIncome') }}:</strong> {{ formatCurrency(empleado.totalIncome) }}</p>
            <p><strong>{{ t('totalDeductions') }}:</strong> {{ formatCurrency(empleado.totalDeductions) }}</p>
          </div>

          <p class="text-2xl font-bold py-4 text-center">
            {{ t('netSalary') }}: {{ formatCurrency(empleado.netPayable) }}
          </p>
        </div>
      </div>

      <div v-else class="text-center py-4 text-gray-600">
        <p>{{ t('noPayrollInfo') }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { usePayrollPaymentStore } from "@/presentation/stores/Payroll.store";
import { useUserStore } from "@/presentation/stores/user.store";

const { t } = useI18n();
const payrollStore = usePayrollPaymentStore();
const userStore = useUserStore();
const loading = ref(false);
const nomina = ref(null);

const fetchNomina = async () => {
  loading.value = true;
  try {
    const response = await payrollStore.fetchPayrollPayments();

    if (!response || !Array.isArray(response)) {
      nomina.value = [];
      return;
    }

    const userId = parseInt(userStore.getUserId);
    nomina.value = response.filter(n => n.user === userId) || [];
  } catch (error) {
    console.error("Error al cargar la nómina:", error);
  } finally {
    loading.value = false;
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value);
};

onMounted(fetchNomina);
</script>

<style>
.blurred {
  filter: blur(5px);
  transition: filter 0.3s ease-in-out;
}

.blurred:hover {
  filter: blur(0);
}
</style>
