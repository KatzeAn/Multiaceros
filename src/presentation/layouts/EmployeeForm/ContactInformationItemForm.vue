<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">{{ t("contactInformation") }}</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('address')" prop="userData.address">
        <el-input v-model="employeeRequestForm.userData.address" />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('phone')" prop="userData.cellPhone">
        <el-input type="tel" v-model="employeeRequestForm.userData.cellPhone" />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('email')" prop="userData.userEmail">
        <el-input type="email" v-model="employeeRequestForm.userData.userEmail" />
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import type { EmployeeRequest } from '@/domain/Interfaces/Employee/EmployeeRequest.interface';
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const props = defineProps<{
  employeeRequestForm: EmployeeRequest;
}>();
</script>
