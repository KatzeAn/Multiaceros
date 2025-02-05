<template>
 <el-row class="" :gutter="16" >
    <el-col :span="24">
      <span class="font-bold text-2xl ">Estadística mensual</span>
    </el-col>
    <el-col 
    :xs="24" 
    :sm="12" 
    :md="8" 
    :lg="8"
    class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--success-alt-color)]">
        <el-statistic :value="0">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Ausencias Aprobadas
              <el-tooltip
                effect="dark"
                content="Número de ausencias aprobadas este mes"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col 
    :xs="24" 
    :sm="12" 
    :md="8" 
    :lg="8"
    class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--primary-alt-color)]">
        <el-statistic :value="0">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Ausencias Rechazadas
              <el-tooltip
                effect="dark"
                content="Número de ausencias rechazadas este mes"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col 
    :xs="24" 
    :sm="12" 
    :md="8" 
    :lg="8"
    class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--info-alt-color)]">
        <el-statistic :value="0">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              Total de Ausencias
              <el-tooltip
                effect="dark"
                content="Total de ausencias creadas este mes"
                placement="top"
              >
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row> 
  <div class="table-container">
    <el-table :data="tableData" class="custom-table">
    <el-table-column prop="name" label="Nombre" width="150" />
    <el-table-column prop="from" label="Desde" width="180" />
    <el-table-column prop="to" label="Hasta" width="180" />
    <el-table-column prop="totalDays" label="Total de Días" width="120" />
    <el-table-column prop="type" label="Tipo" width="150" />
    <el-table-column prop="status" label="Estado" width="150">
      <template #default="scope">
        <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>


  <script lang="ts" setup>
import { ref } from 'vue';

const tableData = ref([
  { name: 'Tom', from: '2016-05-03', to: '2016-05-03', totalDays: 1, type: 'Vacaciones', status: 'Pendiente' },
  { name: 'Alice', from: '2016-05-03', to: '2016-05-03', totalDays: 2, type: 'Enfermedad', status: 'Aprobado' },
  { name: 'Bob', from: '2016-05-03', to: '2016-05-03', totalDays: 3, type: 'Permiso', status: 'Cancelado' },
  { name: 'Tom', from: '2016-05-03', to: '2016-05-03', totalDays: 1, type: 'Vacaciones', status: 'Pendiente' },
  { name: 'Alice', from: '2016-05-03', to: '2016-05-03', totalDays: 2, type: 'Enfermedad', status: 'Aprobado' },
  { name: 'Bob', from: '2016-05-03', to: '2016-05-03', totalDays: 3, type: 'Permiso', status: 'Cancelado' },
  { name: 'Tom', from: '2016-05-03', to: '2016-05-03', totalDays: 1, type: 'Vacaciones', status: 'Pendiente' },
  { name: 'Alice', from: '2016-05-03', to: '2016-05-03', totalDays: 2, type: 'Enfermedad', status: 'Aprobado' },
  { name: 'Bob', from: '2016-05-03', to: '2016-05-03', totalDays: 3, type: 'Permiso', status: 'Cancelado' },
]);



const getStatusType = (status) => {
  switch (status) {
    case 'Aprobado': return 'success';
    case 'Pendiente': return 'warning';
    case 'Cancelado': return 'danger';
    default: return '';
  }
};

  </script>
  
  <style scoped>
  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }
  
  .statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
  }


.custom-table ::v-deep(.el-table__header th) {
  background-color: #cee4ff;
  color: gray;
  text-align: center;
}



  </style>
  