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
    <PersonalInformationItemForm />

    <!-- Información de contacto -->
    <ContactInformationItemForm />

    <!-- Información laboral -->
    <LaboralInformationItemForm />

    <!-- Seguridad Social -->
    <SocialSecurityItemForm />

    <!-- Bonificaciones -->
    <BonificationItemForm />

    <!-- Beneficios-->
    <BenefitItemForm />

    <el-form-item class="mt-6">
      <el-button
        :loading="isLoading"
        type="success"
        @click="submitForm(ruleFormRef)"
      >
        Enviar Solicitud
      </el-button>
      >
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

const { isLoading, ruleFormRef, rules, submitForm, employeeRequestForm } =
  useEmployeeViewModel();
</script>
