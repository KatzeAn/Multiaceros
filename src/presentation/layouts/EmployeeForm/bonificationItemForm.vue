<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">{{ t("bonuses") }}</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item
        :label="t('startDate')"
        prop="bonificationData.activeBonusDate"
      >
        <el-date-picker
          v-model="employeeRequestForm.bonificationData.activeBonusDate"
          type="date"
          :placeholder="t('selectDate')"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item
        :label="t('endDate')"
        prop="bonificationData.bonusEndDate"
      >
        <el-date-picker
          v-model="employeeRequestForm.bonificationData.bonusEndDate"
          type="date"
          :placeholder="t('selectDate')"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('value')" prop="bonificationData.bonificationValue">
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
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const props = defineProps<{
  employeeRequestForm: EmployeeRequest;
}>();
</script>
