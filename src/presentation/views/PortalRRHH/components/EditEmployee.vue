<template>
  <el-form
    ref="ruleFormRef"
    :model="employeeRequestForm"
    :rules="rules"
    label-width="auto"
    class="w-full"
    size="default"
    label-position="top"
    status-icon
  >
    
    <!-- Tipo de Sangre -->
    <el-row :gutter="30">
    <el-col :xs="24" :sm="12" :md="8">
      <el-form-item :label="t('bloodType')" prop="bloodTypeId">
        <el-select v-model="employeeRequestForm.bloodTypeId" :placeholder="t('selectBloodType')">
          <el-option
            v-for="bloodType in bloodTypeStore.bloodTypeList"
            :key="bloodType.id"
            :label="bloodType.name"
            :value="bloodType.id"
          />
        </el-select>
      </el-form-item>
    </el-col>
<!-- Salario -->
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
<!-- cargo -->

      <el-col :xs="24" :sm="12" :md="8">
        <el-form-item :label="t('jobTitle')" prop="jobTitleId">
          <el-select
            v-model="employeeRequestForm.jobTitleId"
            :placeholder="t('selectJobTitle')"
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
      <!-- tipo de contrato -->
</el-row>
      <el-row :gutter="30">
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
    
<!-- fecha de inicio -->

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
<!-- fecha fin -->

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
  <!-- eps -->

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
<!-- tipo de eps -->

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
<!-- arl -->

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
<!-- riesgo -->

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
<!-- fondo de pension -->

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
<!-- tipo de fondo de pension -->

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
<!-- fondo de compensacion -->

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
<!-- fondo de cesantias -->

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
<!-- departamento -->

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
<!-- bonificaciones -->

    <BonificationItemForm :employeeRequestForm="employeeRequestForm" />
<!-- beneficios -->

    <BenefitItemForm  :employeeRequestForm="employeeRequestForm"  @update-benefits="updateBenefits" />

    <el-form-item class="mt-6">
      <el-button :loading="isLoading" type="success" @click="handleSubmit">
        Enviar Solicitud
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useEmployeeViewModel } from "@/presentation/viewmodels/employeeViewModel";
import BonificationItemForm from "@/presentation/layouts/EmployeeForm/bonificationItemForm.vue";
import BenefitItemForm from "@/presentation/layouts/EmployeeForm/benefitItemForm.vue";
import { useBloodTypeStore } from "@/presentation/stores/bloodType.store";
import { useContracTypeStore } from "@/presentation/stores/contractType.store";
import { useJobTitleViewModel } from "@/presentation/viewmodels/jobTitleViewModel";
import { computed, onMounted, ref } from "vue";
import { useArlViewModel } from "@/presentation/viewmodels/arlViewModel";
import { useEpsViewModel } from "@/presentation/viewmodels/epsViewModel";
import { usePensionFundViewModel } from "@/presentation/viewmodels/pensionFundViewModel";
import { useFamilyCompensationFundViewModel } from "@/presentation/viewmodels/familyCompensationFundViewModel";
import { useDepartmentViewModel } from "@/presentation/viewmodels/departmentViewModel";
import { useI18n } from "vue-i18n";
import { useSeveranceFundViewModel } from "@/presentation/viewmodels/severanceFundViewModel";

const { t } = useI18n()
const { isLoading, ruleFormRef, rules, submitForm, employeeRequestForm } =
  useEmployeeViewModel();
  
const updateBenefits = (newBenefits: any) => {
  employeeRequestForm.value.benefits = newBenefits;
};
const { divisionList } = useDepartmentViewModel();
const bloodTypeStore = useBloodTypeStore();

const emit = defineEmits(["employee-saved"]);
  
const handleSubmit = () => {
  submitForm(ruleFormRef.value, (event) => emit(event as "employee-saved"));
};
  

const { severanceFundList } = useSeveranceFundViewModel();
  
const { fetchContractType } = useContracTypeStore();
const contractTypeStore = useContracTypeStore();
const contractTypeOptions = computed(() => contractTypeStore.contractTypeList);  
const { jobTitles } = useJobTitleViewModel();


const { epsList } = useEpsViewModel();
const { arlList } = useArlViewModel();
const { pensionFundList } = usePensionFundViewModel();
const { familyCompensationFundList } = useFamilyCompensationFundViewModel();
  
const loading = ref(false);
  
const loadData = async () => {
  await fetchContractType();
  await bloodTypeStore.fetchBloodType(true);
  await contractTypeStore.fetchContractType(true); 
};
  
onMounted(() => {
  loadData();
});
</script>