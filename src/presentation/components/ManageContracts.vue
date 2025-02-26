<template>
  <div class="p-6">
    <h2 class="text-lg font-semibold mb-4">Gestión de Contratos</h2>
    
    <div class="flex gap-4 items-center mb-4">
      <el-input v-model="selectedDays" placeholder="Ingrese días" type="number" />
      <el-button type="primary" @click="fetchContracts">Consultar</el-button>
    </div>
    
    <el-table :data="contracts" style="width: 100%" border stripe>
      <el-table-column label="Nombre" prop="userFirstName" />
      <el-table-column label="Apellido" prop="userSurName" />
      <el-table-column label="Correo Electrónico" prop="userEmail" />
      <el-table-column label="Tipo de contrato" prop="contractType" />
      <el-table-column label="Fecha de finalizacion del contrato" prop="contractEndDate" />
      <el-table-column label="Días para vencer" prop="daysRemaining" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useContractDaysStore } from "@/presentation/stores/contract.store";

const selectedDays = ref(null);
const contracts = ref([]);
const contractDaysStore = useContractDaysStore();

const fetchContracts = async () => {
if (selectedDays.value) {
  contracts.value = await contractDaysStore.fetchContractsByDaysRemaining(selectedDays.value);
}
};
</script>

<style scoped>
.p-6 {
background-color: #fff;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
