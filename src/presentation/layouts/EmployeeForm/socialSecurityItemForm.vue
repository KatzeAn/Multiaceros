<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Seguridad Social</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="12">
      <el-form-item label="EPS" prop="epsData.id">
        <el-select
          v-model="employeeRequestForm.epsData.id"
          placeholder="Seleccione la EPS"
        >
          <el-option
            v-for="eps in epsList"
            :key="eps.id"
            :label="eps.epsName"
            :value="eps.id"
          />
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
      <el-form-item label="ARL" prop="arlData.id">
        <el-select
          v-model="employeeRequestForm.arlData.id"
          placeholder="Seleccione la ARL"
        >
          <el-option
            v-for="arl in arlList"
            :key="arl.id"
            :label="arl.nameArl"
            :value="arl.id"
          />
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
      <el-form-item label="Fondo de pensiones" prop="pensionFundInfoData.id">
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.id"
          placeholder="Seleccione el fondo de pensiones"
        >
          <el-option
            v-for="pension in pensionFundList"
            :key="pension.id"
            :label="pension.pensionFundName"
            :value="pension.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item
        label="Tipo de fondo de pensión"
        prop="pensionFundInfoData.pensionFundTypeId"
      >
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
          placeholder="Seleccione la caja de compensación"
        >
          <el-option
            v-for="familyCompensation in familyCompensationFundList"
            :key="familyCompensation.id"
            :label="familyCompensation.compensationFundName"
            :value="familyCompensation.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12">
      <el-form-item label="Fondo de cesantías" prop="severanceFundId">
        <el-select
          v-model="employeeRequestForm.severanceFundId"
          placeholder="Seleccione el fondo"
        >
          <el-option
            v-for="severanceFund in severanceFundList"
            :key="severanceFund.id"
            :label="severanceFund.severanceFundName"
            :value="severanceFund.id"
          />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

import { useEmployeeViewModel } from "@/presentation/viewmodels/employeeViewModel";
import { useArlViewModel } from "@/presentation/viewmodels/arlViewModel";
import { useEpsViewModel } from "@/presentation/viewmodels/epsViewModel";
import { usePensionFundViewModel } from "@/presentation/viewmodels/pensionFundViewModel";
import { useSeveranceFundViewModel } from "@/presentation/viewmodels/severanceFundViewModel";
import { useFamilyCompensationFundViewModel } from "@/presentation/viewmodels/familyCompensationFundViewModel";

const { employeeRequestForm } = useEmployeeViewModel();
const { arlList } = useArlViewModel();
const { epsList } = useEpsViewModel();
const { pensionFundList } = usePensionFundViewModel();
const { severanceFundList } = useSeveranceFundViewModel();
const { familyCompensationFundList } = useFamilyCompensationFundViewModel();

</script>
