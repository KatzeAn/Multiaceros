<template>
  <el-drawer
     :model-value="drawer"
     @update:model-value="$emit('update:drawer', $event)"
     :before-close="handleClose"
     style="background-color: var(--base-color)"
     :fullscreen="isSmallScreen"
     :size="isSmallScreen ? '100%' : '40%'"
     class="custom-drawer"
   >
     <template #header>
       <div class="flex flex-row justify-between">
         <div class="flex flex-row gap-5">
           <el-avatar
             :size="70"
             src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
           ></el-avatar>
           <div>
             <div class="flex flex-row gap-4">
               <span class="text-xl font-bold">{{
                 `${employeePotential?.firstName} ${employeePotential?.surName}`
               }}</span>
               <el-tag type="success">{{ t('activo') }}</el-tag>
             </div>
             <div class="flex flex-row gap-2">
               <span class="font-semibold text-gray-400">{{
                 employeePotential?.jobPostingTitle
               }}</span>
             </div>
           </div>
         </div>
         <div class="self-center">
           <el-button icon="message" type="info" @click="" size="large" disabled>
             {{ t('enviarCorreo') }}
           </el-button>
         </div>
       </div>
     </template>
 
     <div class="w-full space-y-6">
       <el-card shadow="never">
         <template #header>
           <span>{{ t('fasesSeleccion') }}</span>
         </template>
 
         <el-steps class="" :space="200" :active="employeePotential?.status">
           <el-step :title="t('postulado')" />
           <el-step :title="t('preseleccion')" />
           <el-step :title="t('entrevista')" />
           <el-step :title="t('pruebaTecnica')" />
           <el-step :title="t('psicologia')" />
           <el-step :title="t('examenMedico')" />
           <el-step :title="t('contratado')" />
         </el-steps>
       </el-card>
 
       <el-card shadow="never">
         <template #header>{{ t('detalles') }}</template>
 
         <div class="grid grid-cols-3">
           <div class="space-y-4">
             <div class="flex flex-col">
               <span class="text-m text-gray-500">{{ t('estadoActual') }}</span>
               <div class="bg-[#F0F9EB] text-center max-w-28 rounded-md border border-green-600">
                 <span class="text-green-600 text-xs">{{ t('activo') }}</span>
               </div>
             </div>
 
             <div class="flex flex-col">
               <span class="text-m text-gray-500">{{ t('fase') }}</span>
               <span class="text-sm">{{ EmployeePotentialStatusEnum[1] }}</span>
             </div>
 
             <div class="flex flex-col">
               <span class="text-m text-gray-500">{{ t('fechaInicio') }}</span>
               <span class="text-sm">
                 {{
                   employeePotential?.jobPostingPublicationDate
                     ? new Date(
                         employeePotential.jobPostingPublicationDate
                       ).toLocaleDateString("es-ES")
                     : t('fechaNoDisponible')
                 }}
               </span>
             </div>
           </div>
           <div>
             <span class="text-m text-gray-500">{{ t('asignadoA') }}</span>
             <div class="flex gap-2">
               <el-avatar
                 :size="25"
                 src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
               />
               <span>Hernando Hernandez Bermudez</span>
             </div>
           </div>
           <div class="flex items-end justify-center">
             <el-button type="primary" @click="" size="large" class="w-full" disabled>
               {{ t('moverFase') }}
             </el-button>
           </div>
         </div>
       </el-card>
 
       <el-card shadow="never">
         <template #header>{{ t('notas') }}</template>
         <el-button disabled type="primary" text>
           <span class="material-symbols-outlined mr-2"> add_circle </span>
           <span class="text-m">{{ t('agregarNota') }}</span>
         </el-button>
 
         <div class="flex flex-row justify-between text-gray-500 mt-4">
           <div class="flex items-center gap-4">
             <el-avatar :size="45" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
             <div>
               <div class="text-sm">
                 <span class="font-bold mr-1">Bagus Friki</span>
                 <span>12 febrero 2024</span> <span>-</span> <span>4:23 PM</span>
               </div>
               <span v-if="employeePotential?.status == 0" class="text-xs">{{ t('postuladoDescripcion') }}</span>
               <span v-if="employeePotential?.status == 1" class="text-xs">{{ t('preseleccionDescripcion') }}</span>
               <span v-if="employeePotential?.status == 2" class="text-xs">{{ t('evaluacionDescripcion') }}</span>
               <span v-if="employeePotential?.status == 3" class="text-xs">{{ t('entrevistaDescripcion') }}</span>
               <span v-if="employeePotential?.status == 4" class="text-xs">{{ t('pruebaTecnicaDescripcion') }}</span>
               <span v-if="employeePotential?.status == 5" class="text-xs">{{ t('psicologiaDescripcion') }}</span>
               <span v-if="employeePotential?.status == 6" class="text-xs">{{ t('examenMedicoDescripcion') }}</span>
               <span v-if="employeePotential?.status == 7" class="text-xs">{{ t('contratadoDescripcion') }}</span>
             </div>
           </div>
           <el-button icon="ChatDotRound" round type="primary" size="large" disabled></el-button>
         </div>
       </el-card>
     </div>
   </el-drawer>
 </template>
 

<script lang="ts" setup>
import { EmployeePotentialStatusEnum } from "@/presentation/common/enum/employeePotentialStatus";
import { useEmployeePotentialViewModel } from "@/presentation/viewmodels/employeePotentialViewModel";
import { onMounted, watch, computed, onBeforeUnmount, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const isSmallScreen = computed(() => screenWidth.value < 800);

onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

// Definir las props
const props = defineProps<{
  drawer: boolean;
  handleClose: (done: () => void) => void;
  documentNumber: number | null;
}>();

defineEmits(["update:drawer"]);

const { loadEmployeePotentialByDocument, employeePotential } =
  useEmployeePotentialViewModel();

onMounted(async () => {
  if (props.documentNumber != null) {
    await loadEmployeePotentialByDocument(props.documentNumber);
  }
});

watch(
  () => props.documentNumber,
  async (newValue) => {
    if (newValue != null) {
      await loadEmployeePotentialByDocument(newValue);
    }
  },
  { immediate: true }
);
</script>
<style>
.custom-drawer .el-drawer__header {
  position: relative;
}

.custom-drawer .el-drawer__close-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  right: auto;
}
</style>