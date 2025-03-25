<template>
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">{{ t("socialSecurity") }}</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12">
      <el-form-item :label="t('eps')" prop="epsData.id">
        <el-select
          v-model="employeeRequestForm.epsData.id"
          :placeholder="t('selectEps')"
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

    <el-col :xs="24" :sm="12">
      <el-form-item :label="t('epsType')" prop="epsData.epsTypeId">
        <el-select
          v-model="employeeRequestForm.epsData.epsTypeId"
          :placeholder="t('selectType')"
        >
          <el-option :label="t('contributory')" :value="1" />
          <el-option :label="t('subsidized')" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12">
      <el-form-item :label="t('arl')" prop="arlData.id">
        <el-select
          v-model="employeeRequestForm.arlData.id"
          :placeholder="t('selectArl')"
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

    <el-col :xs="24" :sm="12">
      <el-form-item :label="t('risk')" prop="arlData.riskId">
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
    <el-col :xs="24" :sm="12">
      <el-form-item :label="t('pensionFund')" prop="pensionFundInfoData.id">
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.id"
          :placeholder="t('selectPensionFund')"
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

    <el-col :xs="24" :sm="12">
      <el-form-item
        :label="t('pensionFundType')"
        prop="pensionFundInfoData.pensionFundTypeId"
      >
        <el-select
          v-model="employeeRequestForm.pensionFundInfoData.pensionFundTypeId"
          :placeholder="t('selectType')"
        >
          <el-option :label="t('contributory')" :value="1" />
          <el-option :label="t('subsidized')" :value="2" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :xs="24" :sm="12">
      <el-form-item :label="t('compensationFund')" prop="familyCompensationFundId">
        <el-select
          v-model="employeeRequestForm.familyCompensationFundId"
          :placeholder="t('selectCompensationFund')"
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

    <el-col :xs="24" :sm="12">
      <el-form-item :label="t('severanceFund')" prop="severanceFundId">
        <el-select
          v-model="employeeRequestForm.severanceFundId"
          :placeholder="t('selectSeveranceFund')"
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
import { useArlViewModel } from "@/presentation/viewmodels/arlViewModel";
import { useEpsViewModel } from "@/presentation/viewmodels/epsViewModel";
import { usePensionFundViewModel } from "@/presentation/viewmodels/pensionFundViewModel";
import { useSeveranceFundViewModel } from "@/presentation/viewmodels/severanceFundViewModel";
import { useFamilyCompensationFundViewModel } from "@/presentation/viewmodels/familyCompensationFundViewModel";

import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const props = defineProps<{
  employeeRequestForm: EmployeeRequest;
}>();

const { arlList } = useArlViewModel();
const { epsList } = useEpsViewModel();
const { pensionFundList } = usePensionFundViewModel();
const { severanceFundList } = useSeveranceFundViewModel();
const { familyCompensationFundList } = useFamilyCompensationFundViewModel();
</script>
