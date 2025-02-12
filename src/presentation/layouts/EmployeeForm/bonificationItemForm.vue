<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Bonificaciones</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="8">
      <el-form-item
        label="Fecha de inicio"
        prop="bonificationData.activeBonusDate"
      >
        <el-date-picker
          v-model="employeeRequestForm.bonificationData.activeBonusDate"
          type="date"
          placeholder="Seleccione una fecha"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item
        label="Fecha de fin"
        prop="bonificationData.activeBonusDate"
      >
        <el-date-picker
          v-model="employeeRequestForm.bonificationData.bonusEndDate"
          type="date"
          placeholder="Seleccione una fecha"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="Valor" prop="bonificationData.bonificationValue">
        <el-input-number
          style="width: 100%"
          :min="0"
          v-model="employeeRequestForm.bonificationData.bonificationValue"
          :step="1"
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";

const props = defineProps<{
  employeeRequestForm: EmployeeRequest;
}>();
</script>
