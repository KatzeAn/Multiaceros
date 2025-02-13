<template>
  <el-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    title="Referir un candidato"
    top="6vh"
  >
    <el-form
      ref="ruleFormRef"
      :model="employeePotentialForm"
      :rules="rules"
      label-width="auto"
      class="w-full"
      size="default"
      label-position="top"
      status-icon
    >
      <el-form-item label="Número de documento">
        <el-input placeholder="Documento" v-model="employeePotentialForm.numberDocument" />
      </el-form-item>

      <el-form-item label="Primer Nombre">
        <el-input placeholder="Primer nombre" v-model="employeePotentialForm.firstName" />
      </el-form-item>

      <el-form-item label="Segundo Nombre">
        <el-input placeholder="Primer nombre" v-model="employeePotentialForm.middleName" />
      </el-form-item>

      <el-form-item label="Apellido">
        <el-input placeholder="Apellido" v-model="employeePotentialForm.firstName" />
      </el-form-item>

      <el-form-item label="Fecha de nacimiento">
      </el-form-item>

      <el-form-item label="Correo eléctronico">
        <el-input placeholder="Correo eléctronico" v-model="employeePotentialForm.email" />
      </el-form-item>

      <el-form-item label="Celular">
        <el-input placeholder="Celular" v-model="employeePotentialForm.email" />
      </el-form-item>

      

      <el-form-item class="mt-6">
        <el-button
          :loading="isLoading"
          type="success"
          @click="submitForm(ruleFormRef)"
        >
          Enviar Solicitud
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useEmployeePotentialViewModel } from "@/presentation/viewmodels/employeePotentialViewModel";

const props = defineProps<{
  dialog: boolean;
}>();

defineEmits(["update:dialog"]);

const { ruleFormRef, rules, submitForm, isLoading, employeePotentialForm } =
  useEmployeePotentialViewModel();
</script>
