<template>
  <el-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    title="Referir un candidato"
    top="6vh"
  >
  </el-dialog>
</template>

<script lang="ts" setup>
import { useEmployeePotentialViewModel } from "@/presentation/viewmodels/employeePotentialViewModel";

// Definir las props
const props = defineProps<{
  dialog: boolean;
}>();

defineEmits(["update:dialog"]);

const { loadEmployeePotentialByDocument, employeePotential } =
  useEmployeePotentialViewModel();
</script>
