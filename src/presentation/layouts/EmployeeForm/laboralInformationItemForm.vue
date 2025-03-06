<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Información laboral</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="8">
      <el-form-item label="Salario" prop="salary">
        <el-input-number
          style="width: 100%"
          :min="1300000"
          v-model="employeeRequestForm.salary"
          :step="100000"
        ></el-input-number>
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="Departamento" prop="divisionId">
        <el-select
          v-model="employeeRequestForm.divisionId"
          placeholder="Seleccione el departamento"
        >
          <el-option
            v-for="division in divisionList"
            :key="division.id"
            :label="division.name"
            :value="division.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="Cargo" prop="jobTitleId">
        <el-select
          v-model="employeeRequestForm.jobTitleId"
          placeholder="Seleccione el cargo"
        >
          <el-option
            v-for="jobTitle in jobTitles"
            :key="jobTitle.id"
            :label="jobTitle.name"
            :value="jobTitle.id"
          />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="8">
      <el-form-item label="Tipo de contrato" prop="contractData.contractTypeId">
        <el-select
          v-model="employeeRequestForm.contractData.contractTypeId"
          placeholder="Seleccione el tipo de contrato"
        >
          <el-option
            v-for="contractType in contractTypeOptions"
            :key="contractType.id"
            :label="contractType.typeOfContract"
            :value="contractType.id"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item
        label="Fecha de inicio"
        prop="contractData.contractStartDate"
      >
        <el-date-picker
          v-model="employeeRequestForm.contractData.contractStartDate"
          type="date"
          aria-label="Seleccione una fecha"
          placeholder="Seleccione una fecha"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item label="Fecha de fin" prop="contractData.contractEndDate">
        <el-date-picker
          v-model="employeeRequestForm.contractData.contractEndDate"
          type="date"
          aria-label="Seleccione una fecha"
          placeholder="Seleccione una fecha"
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
