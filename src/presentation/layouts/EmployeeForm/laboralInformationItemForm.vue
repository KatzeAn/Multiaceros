<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">{{ t("laborInfo") }}</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('salary')" prop="salary">
        <el-input-number
          style="width: 100%"
          :min="1300000"
          v-model="employeeRequestForm.salary"
          :step="100000"
        ></el-input-number>
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('department')" prop="divisionId">
        <el-select v-model="employeeRequestForm.divisionId" :placeholder="t('selectDepartment')">
          <el-option
            v-for="division in divisionList"
            :key="division.id"
            :label="division.name"
            :value="division.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('jobTitle')" prop="jobTitleId">
        <el-select v-model="employeeRequestForm.jobTitleId" :placeholder="t('selectJobTitle')">
          <el-option
            v-for="jobTitle in jobTitles"
            :key="jobTitle.id"
            :label="jobTitle.name"
            :value="jobTitle.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('contractType')" prop="contractData.contractTypeId">
        <el-select v-model="employeeRequestForm.contractData.contractTypeId" :placeholder="t('selectContractType')">
          <el-option
            v-for="contractType in contractTypeOptions"
            :key="contractType.id"
            :label="contractType.typeOfContract"
            :value="contractType.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('startDate')" prop="contractData.contractStartDate">
        <el-date-picker
          v-model="employeeRequestForm.contractData.contractStartDate"
          type="date"
          :placeholder="t('selectDate')"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('endDate')" prop="contractData.contractEndDate">
        <el-date-picker
          v-model="employeeRequestForm.contractData.contractEndDate"
          type="date"
          :placeholder="t('selectDate')"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useContracTypeStore } from "@/presentation/stores/contractType.store";

import { useDepartmentViewModel } from "@/presentation/viewmodels/departmentViewModel";
import { useJobTitleViewModel } from "@/presentation/viewmodels/jobTitleViewModel";

import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";

import { useI18n } from "vue-i18n";

const { t } = useI18n()

const props = defineProps<{
  employeeRequestForm: EmployeeRequest;
}>();

const { divisionList } = useDepartmentViewModel();
const { jobTitles } = useJobTitleViewModel();

const contractTypeStore = useContracTypeStore();
const contractTypeOptions = computed(() => contractTypeStore.contractTypeList);

const loading = ref(false);

const loadData = async () => {
  loading.value = true;
  await contractTypeStore.fetchContractType(true); 
  loading.value = false;
};


onMounted(() => {
  loadData();
});
</script>
