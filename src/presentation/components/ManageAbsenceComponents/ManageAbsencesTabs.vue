<script setup>
import pendingAbsencesItemCard from './PendingAbsencesItem.vue';
import upcomingAbsencesItemCard from './UpcomingAbsencesItem.vue';
import monthlyAbcesesItemCard from './MonthlyAbcesesItem.vue';

</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Ausencias Pendientes">
      <pendingAbsencesItemCard/>
    </el-tab-pane>
    <el-tab-pane label="Proximas Ausencias">
      <upcomingAbsencesItemCard/>
    </el-tab-pane>
    <el-tab-pane label="Historial Mensual">
      <monthlyAbcesesItemCard/>
    </el-tab-pane>
  </el-tabs>
</template>