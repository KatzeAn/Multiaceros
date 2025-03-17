<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Información de contacto</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item label="Dirección de residencia" prop="userData.address">
        <el-input v-model="employeeRequestForm.userData.address" />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item label="Celular" prop="userData.cellPhone">
        <el-input type="tel" v-model="employeeRequestForm.userData.cellPhone" />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item label="Email" prop="userData.userEmail">
        <el-input
          type="email"
          v-model="employeeRequestForm.userData.userEmail"
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { EmployeeRequest } from '@/domain/Interfaces/Employee/EmployeeRequest.interface';

const props = defineProps<{
  employeeRequestForm: EmployeeRequest;
}>();
</script>
