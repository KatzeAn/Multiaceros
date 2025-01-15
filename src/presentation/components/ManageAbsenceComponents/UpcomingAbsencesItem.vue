<template>
    <div v-loading="false">
    <template v-if="absenceList.length > 0">
        <el-card v-for="absence in absenceList" :key="absence.id" shadow="hover">
            <el-row :gutter="30">

                <el-col :span="1">
                    <el-avatar shape="circle" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                </el-col>

                <el-col :span="23">
                    <div class="flex flex-col">
                        <span>{{ absence.fullName }}</span>
                        <span>Tipo: {{ absence.absenceType }}</span>
                        <span>Fecha de Inicio: {{ new Date(absence.startDate).toLocaleString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'}) }} - Fecha de Regreso: {{ new Date(absence.endDate).toLocaleString('es-ES', {year: 'numeric', month: 'long', day: 'numeric'}) }}</span>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </template>
    <template v-else>
      <el-empty description="No se encontraron ausencias" />
    </template>
  </div>
  </template>
  
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useAbsenceStore } from '../../stores/absence.store';

const loading = ref<boolean>(false);
const absenceList = ref<AbsenceList>([]);

const loadData = async () => {
  const { loading: isLoading, absenceList: absences } = await useAbsenceStore().fetchUpcomingAbsences();
  loading.value = isLoading;
  absenceList.value = absences;
};

onMounted(() => {
  loadData();
});

</script>
  