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
          :min="0"
          v-model="employeeRequestForm.salary"
          :step="1"
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
            v-for="division in divisionOptions"
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
            v-for="jobTitle in jobTitleOptions"
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
import { onMounted, ref } from "vue";
import { useEmployeeStore } from "@/presentation/stores/employee.store";
import { useDivisionStore } from "@/presentation/stores/division.store";
import { useJobTitleStore } from "@/presentation/stores/jobTitle.store";
import { useContracTypeStore } from "@/presentation/stores/contractType.store";
import type { Division } from "@/domain/Interfaces/Division/division.interface";
import type { JobTitle } from "@/domain/Interfaces/JobTitle/JobTitle.interface";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";

const { employeeRequestForm } = useEmployeeStore();

const { fetchDivisions } = useDivisionStore();
const { fetchJobTitles } = useJobTitleStore();
const { fetchContractType } = useContracTypeStore();

const loadingDivision = ref(false);
const divisionOptions = ref<Division[]>([]);

const loadingJobTitle = ref(false);
const jobTitleOptions = ref<JobTitle[]>([]);

const loadingContractType = ref(false);
const contractTypeOptions = ref<ContractType[]>([]);

const loadData = async () => {
  const { loading: isDivisionLoading, divisionList: divisionList } =
    await fetchDivisions();
  loadingDivision.value = isDivisionLoading;
  divisionOptions.value = divisionList;

  const { loading: isJobTitleLoading, jobTitleList: jobList } =
    await fetchJobTitles();
  loadingJobTitle.value = isJobTitleLoading;
  jobTitleOptions.value = jobList;

  const { loading: isContractTypeLoading, contractTypeList: contractList } =
    await fetchContractType();
  loadingContractType.value = isContractTypeLoading;
  contractTypeOptions.value = contractList;
};

onMounted(() => {
  loadData();
});
</script>
