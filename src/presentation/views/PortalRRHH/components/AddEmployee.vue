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
    <!-- Datos personales -->
    <PersonalInformationItemForm :employeeRequestForm="employeeRequestForm" />

    <!-- Información de contacto -->
    <ContactInformationItemForm :employeeRequestForm="employeeRequestForm" />

    <!-- Información laboral -->
    <LaboralInformationItemForm :employeeRequestForm="employeeRequestForm" />

    <!-- Seguridad Social -->
    <SocialSecurityItemForm :employeeRequestForm="employeeRequestForm" />

    <!-- Bonificaciones -->
    <BonificationItemForm :employeeRequestForm="employeeRequestForm" />

    <!-- Beneficios -->
    <BenefitItemForm :employeeRequestForm="employeeRequestForm" @update-benefits="updateBenefits"/>

    <el-form-item class="mt-6">
      <el-button :loading="isLoading" type="success" @click="handleSubmit">
        {{ t("sendRequest") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useEmployeeViewModel } from "@/presentation/viewmodels/employeeViewModel";
import PersonalInformationItemForm from "@/presentation/layouts/EmployeeForm/PersonalInformationItemForm.vue";
import ContactInformationItemForm from "@/presentation/layouts/EmployeeForm/ContactInformationItemForm.vue";
import LaboralInformationItemForm from "@/presentation/layouts/EmployeeForm/laboralInformationItemForm.vue";
import SocialSecurityItemForm from "@/presentation/layouts/EmployeeForm/socialSecurityItemForm.vue";
import BonificationItemForm from "@/presentation/layouts/EmployeeForm/bonificationItemForm.vue";
import BenefitItemForm from "@/presentation/layouts/EmployeeForm/benefitItemForm.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const { isLoading, ruleFormRef, rules, submitForm, employeeRequestForm } =
  useEmployeeViewModel();

const updateBenefits = (newBenefits: any) => {
  employeeRequestForm.value.benefits = newBenefits;
};

const emit = defineEmits(["employee-saved"]);

const handleSubmit = () => {
  submitForm(ruleFormRef.value, (event) => emit(event as "employee-saved"));
};
</script>
