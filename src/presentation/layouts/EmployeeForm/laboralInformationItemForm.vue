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
            v-for="division in DivisionOptions"
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
          <el-option label="Gerente" :value="1" />
          <el-option label="Analista" :value="2" />
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
          <el-option label="Contrato A Término Fijo" :value="1" />
          <el-option label="Contrato A Término Indefinido" :value="2" />
          <el-option label="Contrato De Obra O Labor" :value="3" />
          <el-option
            label="Contrato Civil Por Prestacion De Servicios"
            value="4"
          />
          <el-option label="Contrato De Pasantia" value="5" />
          <el-option label="Contrato Ocasional De Trabajo" value="6" />
          <el-option label="Contrato" value="7" />
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
import type { Division } from "@/domain/Interfaces/Division/division.interface";
import { useEmployeeStore } from "@/presentation/stores/employee.store";
import { useDivisionStore } from "@/presentation/stores/division.store";
import { onMounted, ref } from "vue";

const { employeeRequestForm } = useEmployeeStore();
const { fetchDivisions } = useDivisionStore();

const loading = ref(false);
const DivisionOptions = ref<Division[]>([]);

const loadData = async () => {
  const { loading: isLoading, divisionList: divisionList } =
    await fetchDivisions();
  loading.value = isLoading;
  DivisionOptions.value = divisionList;
};

onMounted(async () => {
  loadData();
});
</script>
