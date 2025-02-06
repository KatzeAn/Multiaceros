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
  <el-table :data="tableData" class="custom-table">
    <el-table-column prop="fullName" label="Nombre" width="150" />
    <el-table-column prop="startDate" label="Desde" width="180" />
    <el-table-column prop="endDate" label="Hasta" width="180" />
    <el-table-column label="Total de Días" width="120">
      <template #default="scope">
        <span>{{ getTotalDays(scope.row.startDate, scope.row.endDate) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="absenceType" label="Tipo" width="150" />
    <el-table-column prop="comment" label="Comentario" width="200" />
    <el-table-column prop="status" label="Estado" width="150">
      <template #default="scope">
        <el-tag :type="getStatusType(scope.row.status)">{{ getStatusName(scope.row.status) }}</el-tag>  
        </template>
    </el-table-column>
    <el-table-column label="Acciones" width="200">
      <template #default="scope">
        <div class="action-buttons">
          <el-button class="approve-btn" @click="approveAbsence(scope.row.id)">
            Aprobar
          </el-button>
          <el-button class="reject-btn" @click="rejectAbsence(scope.row.id)">
            Rechazar
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAbsenceStore } from '@/presentation/stores/absence.store';

const tableData = ref<Absence[]>([]);

const getStatusType = (status: number) => {
  switch (status) {
    case 1: return 'success'; 
    case 2: return 'warning';
    case 3: return 'danger';
    default: return '';
  }
};
const getStatusName = (status: number) => {
  switch (status) {
    case 1: return 'Pendiente';
    case 2: return 'Aprobado';
    case 3: return 'Rechazado';
    default: return 'Desconocido';
  }
};

const absenceStore = useAbsenceStore();

const fetchAbsences = async () => {
  const result = await absenceStore.fetchPendingAbsences();
  console.log(result.absenceList);
  tableData.value = result.absenceList;
};

onMounted(() => {
  fetchAbsences();
});

const approveAbsence = (absenceId: number) => {
  absenceStore.approveAbsence(absenceId);
};

const rejectAbsence = (absenceId: number) => {
  absenceStore.rejectAbsence(absenceId);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const getTotalDays = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const difference = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  return difference + 1; 
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
.approve-btn {
  background-color: #e0e0e0;
  color: #333;
  border: 1px solid #ccc;
}

.reject-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ccc;
}

.approve-btn:hover {
  background-color: #d6d6d6;
}

.reject-btn:hover {
  background-color: #e2e2e2;
}
.action-buttons {
  display: flex;
  justify-content: space-between;
}
  </style>
  