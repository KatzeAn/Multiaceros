<template>
    <div class="p-6 space-y-6">
      <el-button type="primary" @click="descargarPlantilla">
        <el-icon><Download /></el-icon>
        Descargar Plantilla
      </el-button>
  
      <el-upload
        class="upload-box"
        drag
        :auto-upload="false"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-change="handleFileChange"
      >
        <el-icon class="upload-icon"><Upload /></el-icon>
        <p v-if="!archivo" class="text-gray-600">Arrastra y suelta un archivo aquí o haz clic para seleccionar</p>
        <div v-else class="archivo-preview">
          <p class="archivo-nombre">{{ archivo.name }}</p>
          <el-button size="small" @click="quitarArchivo">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
      </el-upload>
  
      <el-progress v-if="subiendo" :percentage="progreso" />
  
      <el-button type="primary" @click="subirArchivo" :disabled="!archivo">
        Subir Archivo
      </el-button>
  
      <div v-if="cargaFinalizada" class="summary">
        <p class="text-gray-600" v-if="errores.length === 0">
          {{ empleados.length }} empleados cargados con éxito.
        </p>
        <p class="text-gray-600" v-else>
          {{ empleados.length }} empleados cargados, {{ errores.length }} errores detectados.
        </p>
      </div>
  
      <el-button v-if="empleados.length" @click="verEmpleados = !verEmpleados">
        Ver empleados cargados
      </el-button>
      <el-table v-if="verEmpleados" :data="empleados" border stripe>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="correo" label="Correo" />
      </el-table>
  
      <el-button v-if="errores.length" type="danger" @click="verErrores = !verErrores">
        Ver errores detallados
      </el-button>
      <el-table v-if="verErrores" :data="errores" border stripe>
        <el-table-column prop="fila" label="Fila" />
        <el-table-column prop="mensaje" label="Error" />
      </el-table>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { Upload, Download, Close } from "@element-plus/icons-vue";
  
  export default {
    components: { Upload, Download, Close },
    setup() {
      const subiendo = ref(false);
      const progreso = ref(0);
      const cargaFinalizada = ref(false);
      const empleados = ref([]);
      const errores = ref([]);
      const verEmpleados = ref(false);
      const verErrores = ref(false);
      const archivo = ref(null);
  
      const beforeUpload = (file) => {
        if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          alert("Formato de archivo no válido");
          return false;
        }
        return true;
      };
  
      const handleFileChange = (file) => {
        archivo.value = file.raw;
      };
  
      const quitarArchivo = () => {
        archivo.value = null;
      };
  
      const subirArchivo = () => {
        if (!archivo.value) return;
  
        subiendo.value = true;
        progreso.value = 0;
  
        const interval = setInterval(() => {
          progreso.value += 10;
          if (progreso.value >= 100) {
            clearInterval(interval);
            subiendo.value = false;
            cargaFinalizada.value = true;
            empleados.value = [
              { id: 1, nombre: "Juan Pérez", correo: "juan@example.com" },
              { id: 2, nombre: "María Gómez", correo: "maria@example.com" },
            ];
            errores.value = [{ fila: 3, mensaje: "Correo electrónico faltante" }];
          }
        }, 300);
      };
  
      const descargarPlantilla = () => {
        window.location.href = "/plantilla.xlsx";
      };
  
      return {
        subiendo,
        progreso,
        cargaFinalizada,
        empleados,
        errores,
        verEmpleados,
        verErrores,
        archivo,
        beforeUpload,
        handleFileChange,
        quitarArchivo,
        subirArchivo,
        descargarPlantilla,
      };
    },
  };
  </script>
  
  <style scoped>
  .upload-box {
    border: 2px dashed #d9d9d9;
    padding: 20px;
    text-align: center;
  }
  
  .upload-icon {
    font-size: 40px;
    color: #409eff;
  }
  
  .summary {
    font-size: 16px;
    font-weight: bold;
  }
  </style>
  