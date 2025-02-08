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
      <el-button type="danger" @click="resetForm(ruleFormRef)"
        >Reiniciar formulario</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useEmployeeStore } from "../../../stores/employee.store";
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import PersonalInformationItemForm from "@/presentation/layouts/EmployeeForm/PersonalInformationItemForm.vue";
import ContactInformationItemForm from "@/presentation/layouts/EmployeeForm/ContactInformationItemForm.vue";
import LaboralInformationItemForm from "@/presentation/layouts/EmployeeForm/laboralInformationItemForm.vue";
import SocialSecurityItemForm from "@/presentation/layouts/EmployeeForm/socialSecurityItemForm.vue";
import BonificationItemForm from "@/presentation/layouts/EmployeeForm/bonificationItemForm.vue";
import BenefitItemForm from "@/presentation/layouts/EmployeeForm/benefitItemForm.vue";

const isLoading = ref(false);
const { employeeRequestForm, createEmployeeRequest, rules } = useEmployeeStore();

const ruleFormRef = ref<FormInstance>();

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    isLoading.value = true;

    const valid = await formEl.validate();
    if (valid) {
      await createEmployeeRequest();
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  } finally {
    isLoading.value = false;
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
