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
    <el-form-item label="Tipo de Sangre" prop="bloodTypeId">
      <el-select
        v-model="employeeRequestForm.bloodTypeId"
        placeholder="Seleccione el tipo de sangre"
      >
        <el-option
          v-for="bloodType in bloodTypeOptions"
          :key="bloodType.id"
          :label="bloodType.name"
          :value="bloodType.id"
        />
      </el-select>
    </el-form-item>

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
    </el-row>
    
    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="EPS" prop="epsData.id">
          <el-select v-model="employeeRequestForm.epsData.id" placeholder="Seleccione la EPS">
            <el-option v-for="eps in epsList" :key="eps.id" :label="eps.epsName" :value="eps.id" />
          </el-select>
        </el-form-item>
      </el-col>
    
      <el-col :span="12">
        <el-form-item label="Tipo de EPS" prop="epsData.epsTypeId">
          <el-select v-model="employeeRequestForm.epsData.epsTypeId" placeholder="Seleccione el tipo">
            <el-option label="Contributivo" :value="1" />
            <el-option label="Subsidiado" :value="2" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="ARL" prop="arlData.id">
          <el-select v-model="employeeRequestForm.arlData.id" placeholder="Seleccione la ARL">
            <el-option v-for="arl in arlList" :key="arl.id" :label="arl.nameArl" :value="arl.id" />
          </el-select>
        </el-form-item>
      </el-col>
      
      <el-col :span="12">
        <el-form-item label="Riesgo" prop="arlData.riskId">
          <el-input-number style="width: 100%" :min="0" :max="5" v-model="employeeRequestForm.arlData.riskId" :step="1"></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>
  
    <el-row :gutter="30">
      <el-col :span="12">
        <el-form-item label="Fondo de pensiones" prop="pensionFundInfoData.id">
          <el-select v-model="employeeRequestForm.pensionFundInfoData.id" placeholder="Seleccione el fondo de pensiones">
            <el-option v-for="pension in pensionFundList" :key="pension.id" :label="pension.pensionFundName" :value="pension.id" />
          </el-select>
        </el-form-item>
      </el-col>
    
      <el-col :span="12">
        <el-form-item label="Caja de compensación" prop="familyCompensationFundId">
          <el-select v-model="employeeRequestForm.familyCompensationFundId" placeholder="Seleccione la caja de compensación">
            <el-option v-for="familyCompensation in familyCompensationFundList" :key="familyCompensation.id" :label="familyCompensation.compensationFundName" :value="familyCompensation.id" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  
    <!-- Bonificaciones -->
    <BonificationItemForm :employeeRequestForm="employeeRequestForm" />
  
    <!-- Beneficios -->
    <BenefitItemForm :employeeRequestForm="employeeRequestForm" @update-benefits="updateBenefits" />
  
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
import type { BloodType } from "@/domain/Interfaces/BloodType/bloodType.interface";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";
import { onMounted, ref } from "vue";
import { useArlViewModel } from "@/presentation/viewmodels/arlViewModel";
import { useEpsViewModel } from "@/presentation/viewmodels/epsViewModel";
import { usePensionFundViewModel } from "@/presentation/viewmodels/pensionFundViewModel";
import { useFamilyCompensationFundViewModel } from "@/presentation/viewmodels/familyCompensationFundViewModel";

const { isLoading, ruleFormRef, rules, submitForm, employeeRequestForm } =
  useEmployeeViewModel();
  
const updateBenefits = (newBenefits: any) => {
  employeeRequestForm.value.benefits = newBenefits;
};
  
const emit = defineEmits(["employee-saved"]);
  
const handleSubmit = () => {
  submitForm(ruleFormRef.value, (event) => emit(event as "employee-saved"));
};
  
const { fetchBloodType } = useBloodTypeStore();
const bloodTypeOptions = ref<BloodType[]>([]);
  
const { fetchContractType } = useContracTypeStore();
const contractTypeOptions = ref<ContractType[]>([]);
  
const { jobTitles } = useJobTitleViewModel();


const { epsList } = useEpsViewModel();
const { arlList } = useArlViewModel();
const { pensionFundList } = usePensionFundViewModel();
const { familyCompensationFundList } = useFamilyCompensationFundViewModel();
  
const loading = ref(false);
  
const loadData = async () => {
  const [{ bloodTypeList }, { contractTypeList }] = await Promise.all([
    fetchBloodType(),
    fetchContractType()
  ]);
  
  bloodTypeOptions.value = bloodTypeList;
  contractTypeOptions.value = contractTypeList;
};
  
onMounted(() => {
  loadData();
});
</script>