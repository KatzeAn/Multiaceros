<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Seguridad Social</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="EPS" prop="epsData.epsId">
        <el-select
          v-model="employeeRequestForm.epsData.epsId"
          placeholder="Seleccione la EPS"
        >
          <el-option label="Sura" :value="1" />
          <el-option label="Sanitas" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Tipo de EPS" prop="epsData.epsTypeId">
        <el-select
          v-model="employeeRequestForm.epsData.epsTypeId"
          placeholder="Seleccione el tipo"
        >
          <el-option label="Contributivo" :value="1" />
          <el-option label="Subsidiado" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="ARL" prop="arlData.arlId">
        <el-select
          v-model="employeeRequestForm.arlData.arlId"
          placeholder="Seleccione la ARL"
        >
          <el-option label="Sura" :value="1" />
          <el-option label="Colpatria" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Riesgo" prop="arlData.riskId">
        <el-input-number
          style="width: 100%"
          :min="0"
          :max="5"
          v-model="employeeRequestForm.arlData.riskId"
          :step="1"
        ></el-input-number>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="Fondo de pensiones" prop="arlData.arlId">
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.pensionFundId"
          placeholder="Seleccione el fondo"
        >
          <el-option label="Porvenir" :value="1" />
          <el-option label="Colpatria" :value="2" />
          <el-option label="Protección" :value="3" />
          <el-option label="BBVA" :value="4" />
          <el-option label="Suramericana" :value="5" />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Tipo de fondo de pensión" prop="arlData.riskId">
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.pensionFundTypeId"
          placeholder="Seleccione el tipo"
        >
          <el-option label="Contributivo" :value="1" />
          <el-option label="Subsidiado" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item
        label="Caja de compensación"
        prop="familyCompensationFundId"
      >
        <el-select
          v-model="employeeRequestForm.familyCompensationFundId"
          placeholder="Seleccione la caja"
        >
          <el-option label="Compensar" :value="1" />
          <el-option label="Colsubsidio" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Fondo de cesantías" prop="severanceFundId">
        <el-select
          v-model="employeeRequestForm.severanceFundId"
          placeholder="Seleccione el fondo"
        >
          <el-option label="Compensar" :value="1" />
          <el-option label="Colsubsidio" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

import { useEmployeeStore } from "@/presentation/stores/employee.store";
const { employeeRequestForm } = useEmployeeStore();

</script>
