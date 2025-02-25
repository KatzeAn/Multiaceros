<template>
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4">Gestión de Contratos</h2>
      
      <div class="flex gap-4 items-center mb-4">
        <el-select v-model="selectedDays" placeholder="Seleccionar días">
          <el-option v-for="days in options" :key="days" :label="`${days} días`" :value="days" />
        </el-select>
        <el-button type="primary">Consultar</el-button>
      </div>
      
      <el-table style="width: 100%" border stripe>
        <el-table-column label="Nombre" prop="userFirstName" />
        <el-table-column label="Apellido" prop="surName" />
        <el-table-column label="Correo Electrónico" prop="userEmail" />
        <el-table-column label="Días para vencer" prop="daysToExpire" />
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const selectedDays = ref(null);
  const options = [5, 7, 30];
  </script>
  
  <style scoped>
  .p-6 {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  