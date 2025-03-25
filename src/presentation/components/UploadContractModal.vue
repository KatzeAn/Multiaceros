<template>
  <el-card class="max-w-md mx-auto shadow-lg">
    <template #header>
      <div class="text-lg font-semibold">{{ t("uploadLaborContract") }}</div>
    </template>

    <div
      class="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:bg-gray-100"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop.prevent="onDrop"
      @click="seleccionarArchivo"
    >
      <div v-if="!archivo" class="text-gray-600">{{ t("dragDropFile") }}</div>
      <div v-else class="flex justify-between items-center bg-gray-200 p-2 rounded">
        <span class="text-gray-500">{{ archivo.name }}</span>
        <el-icon class="cursor-pointer text-red-500" @click.stop="eliminarArchivo"><Close /></el-icon>
      </div>
    </div>

    <input type="file" ref="fileInput" accept=".pdf,.docx" @change="onFileChange" hidden />

    <el-progress v-if="subiendo" :percentage="progreso" status="success" class="mt-4" />

    <el-button type="primary" class="w-full mt-4" :disabled="!archivo || subiendo" @click="subirArchivo">
      {{ t("uploadContract") }}
    </el-button>

    <el-card v-if="errores.length" shadow="never" class="bg-red-100 border border-red-500 mt-4">
      <template #header>
        <span class="text-red-600 font-semibold">{{ t("errorsFound") }}</span>
      </template>
      <ul class="list-disc pl-4 text-red-700">
        <li v-for="(error, index) in errores" :key="index">{{ error }}</li>
      </ul>
    </el-card>

    <el-card v-if="mensaje" shadow="never" class="bg-green-100 border border-green-500 mt-4">
      <template #header>
        <span class="text-green-600 font-semibold">{{ t("success") }}</span>
      </template>
      <p class="text-green-700">{{ mensaje }}</p>
    </el-card>
  </el-card>
</template>

<script>
import { ref } from "vue";
import { Close } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

export default {
  components: {
    Close,
  },
  setup() {
    const { t } = useI18n();
    const archivo = ref(null);
    const fileInput = ref(null);
    const mensaje = ref("");
    const errores = ref([]);
    const subiendo = ref(false);
    const progreso = ref(0);

    const onDragOver = (event) => event.currentTarget.classList.add("bg-gray-200");
    const onDragLeave = (event) => event.currentTarget.classList.remove("bg-gray-200");

    const onDrop = (event) => {
      event.currentTarget.classList.remove("bg-gray-200");
      const archivos = event.dataTransfer.files;
      if (archivos.length) {
        validarArchivo(archivos[0]);
      }
    };

    const onFileChange = (event) => {
      if (event.target.files.length) {
        validarArchivo(event.target.files[0]);
      }
    };

    const seleccionarArchivo = () => fileInput.value.click();

    const validarArchivo = (file) => {
      errores.value = [];
      const formatosPermitidos = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

      if (!formatosPermitidos.includes(file.type)) {
        errores.value.push("Formato no permitido. Solo PDF o DOCX.");
      }
      if (file.size > 5 * 1024 * 1024) {
        errores.value.push("El archivo excede el tamaño máximo de 5MB.");
      }

      if (errores.value.length === 0) {
        archivo.value = file;
      } else {
        archivo.value = null;
      }
    };

    const subirArchivo = () => {
      if (!archivo.value) return;

      subiendo.value = true;
      progreso.value = 0;
      mensaje.value = "";

      const interval = setInterval(() => {
        if (progreso.value >= 100) {
          clearInterval(interval);
          subiendo.value = false;
          mensaje.value = t("upload.successMessage", { fileName: archivo.value.name });
          archivo.value = null;
        } else {
          progreso.value += 10;
        }
      }, 300);
    };

    const eliminarArchivo = () => {
      archivo.value = null;
    };

    return { t, archivo, fileInput, mensaje, errores, subiendo, progreso, onDragOver, onDragLeave, onDrop, onFileChange, seleccionarArchivo, subirArchivo, eliminarArchivo };
  },
};
</script>

<style scoped>
</style>