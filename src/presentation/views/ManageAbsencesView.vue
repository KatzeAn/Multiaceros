<script setup lang="ts">
    import StaticsAbsencesCard from '../components/ManageAbsenceComponents/StatisticsAbsencesCard.vue'
    import ManageAbsencesTabs from '../components/ManageAbsenceComponents/ManageAbsencesTabs.vue'
    import { ref } from 'vue'
    const value = ref(new Date())
</script>

<template>
    <main>
        <el-row :gutter="0">
          <el-col :span="24">
            <el-card>
                <StaticsAbsencesCard />
            </el-card>
          </el-col>
        </el-row>
        <el-row class="mt-6" :gutter="0">
          <el-col :span="24">
            <ManageAbsencesTabs />
          </el-col>
        </el-row>
    </main>
</template>