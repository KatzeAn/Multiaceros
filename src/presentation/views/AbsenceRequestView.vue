<script setup lang="ts">
import AbsenceRequestForm from '../layouts/AbsenceRequestForm.vue'
import { ref } from 'vue'
const value = ref(new Date())
</script>

<template>
    <main>
        <el-row>
            <el-col :span="24">
                <el-link>
                    <el-icon :size="20">
                        <ArrowLeft />
                    </el-icon>
                    Volver
                </el-link>
            </el-col>
        </el-row>
        <el-row :gutter="30" class="my-4">
            <el-col 
            :xs="24" 
            :sm="12" 
            :md="12" 
            :lg="12" 
            class="mb-4 sm:mb-0">
            <AbsenceRequestForm></AbsenceRequestForm>
            </el-col>
            <el-col 
            :xs="24" 
            :sm="12" 
            :md="12" 
            :lg="12" 
            class="mb-4 sm:mb-0">                
                <div>
                    <el-calendar v-model="value" />
                </div>
            </el-col>
        </el-row>
    </main>
</template>
