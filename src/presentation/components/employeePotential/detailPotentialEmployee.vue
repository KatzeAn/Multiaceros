<template>
  <el-drawer
    :model-value="drawer"
    @update:model-value="$emit('update:drawer', $event)"
    direction="rtl"
    :before-close="handleClose"
    size="50%"
    style="background-color: var(--base-color)"
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
              <span class="text-xl font-bold">Cody Fisher</span>
              <el-tag type="success">Activo</el-tag>
            </div>
            <div class="flex flex-row gap-2">
              <span class="font-semibold text-gray-400">Design Team</span>
              <span class="font-semibold text-gray-400">-</span>
              <span class="font-semibold text-gray-400">UI Designer</span>
            </div>
          </div>
        </div>
        <div class="self-center">
          <el-button
            icon="message"
            type="info"
            @click=""
            size="large"
            disabled
            >Enviar Correo</el-button
          >
        </div>
      </div>
    </template>

    <div class="w-full space-y-6">
      <el-card shadow="never">
        <template #header>
          <span>Fases de selección</span>
        </template>

        <el-steps class="" :space="200" :active="0">
          <el-step title="Preeseleción" />
          <el-step title="Entrevista" />
          <el-step title="Prueba técnica" />
          <el-step title="Prueba psicológica" />
          <el-step title="Examen médico" />
          <el-step title="Contratado" />
        </el-steps>
      </el-card>

      <el-card shadow="never">
        <template #header> Detalles </template>

        <div class="grid grid-cols-3">
          <div class="space-y-4">
            <div class="flex flex-col">
              <span class="text-m text-gray-500">Estado Actual</span>
              <div
                class="bg-[#F0F9EB] text-center max-w-28 rounded-md border border-green-600"
              >
                <span class="text-green-600 text-xs">Activo</span>
              </div>
            </div>

            <div class="flex flex-col">
              <span class="text-m text-gray-500">Fase</span>
              <span class="text-sm">Preselección</span>
            </div>

            <div class="flex flex-col">
              <span class="text-m text-gray-500">Fecha de inicio</span>
              <span class="text-sm">8 de enero de 2024</span>
            </div>
          </div>
          <div>
            <span class="text-m text-gray-500">Asignado a</span>
            <div class="flex gap-2">
              <el-avatar
                :size="25"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              <span>Andri R. Herdiansyah</span>
            </div>
          </div>
          <div class="flex items-end justify-center">
            <el-button type="primary" @click="" size="large" disabled
              >Mover a la siguiente fase</el-button
            >
          </div>
        </div>
      </el-card>

      <el-card>
        <template #header> Notas </template>
        <button class="flex font-bold text-blue-600" disabled></button>
        <el-button type="primary" text>
          <span class="material-symbols-outlined mr-2"> add_circle </span>
          <span class="text-m">Agregar nota</span>
        </el-button>

        <div class="flex flex-row justify-between text-gray-500 mt-4">
          <div class="flex items-center gap-4">
            <el-avatar
              :size="45"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <div class="">
              <div class="text-sm">
                <span class="font-bold mr-1">Bagus Friki</span>
                <span>12 febrero 2024</span> <span>-</span> <span>4:23 PM</span>
              </div>
              <span class="text-xs"
                >Candidato correctamente entrevistado en esta etapa</span
              >
            </div>
          </div>
          <span class="material-symbols-outlined"> chat </span>
        </div>
      </el-card>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
defineProps({
  drawer: Boolean,
  handleClose: Function,
});

defineEmits(["update:drawer"]);
</script>
