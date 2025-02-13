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
      <div class="grid grid-cols-2 gap-6 space-y-2">
        <el-form-item prop="numberDocument" label="Número de documento">
          <el-input
            placeholder="Documento"
            v-model="employeePotentialForm.numberDocument"
          />
        </el-form-item>

        <el-form-item prop="firstName" label="Primer Nombre">
          <el-input
            placeholder="Primer nombre"
            v-model="employeePotentialForm.firstName"
          />
        </el-form-item>

        <el-form-item label="Segundo Nombre">
          <el-input
            placeholder="Segundo nombre"
            v-model="employeePotentialForm.middleName"
          />
        </el-form-item>

        <el-form-item prop="surName" label="Apellido">
          <el-input
            placeholder="Apellido"
            v-model="employeePotentialForm.surName"
          />
        </el-form-item>

        <el-form-item prop="dateOfBirth" label="Fecha de nacimiento">
          <el-date-picker
            v-model="employeePotentialForm.dateOfBirth"
            type="date"
            placeholder="Seleccione una fecha"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item prop="email" label="Correo eléctronico">
          <el-input
            placeholder="Correo eléctronico"
            v-model="employeePotentialForm.email"
          />
        </el-form-item>

        <el-form-item prop="cellPhone" label="Celular">
          <el-input
            placeholder="Celular"
            v-model="employeePotentialForm.cellPhone"
          />
        </el-form-item>

        <el-form-item prop="jobPostingId" label="Puesto a referir">
          <el-select
            v-model="employeePotentialForm.jobPostingId"
            placeholder="Seleccione el puesto a referir"
          >
            <el-option label="Programador" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>

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
