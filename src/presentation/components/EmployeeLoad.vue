<template> 
  <div class="p-6 space-y-6">
    <el-button type="primary"  @click="downloadEmployeeFile">
      <el-icon><Download /></el-icon>
      {{ t("buttons.downloadTemplate") }}
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
      <p v-if="!archivo" class="text-gray-600">
        {{ t("uploads.dragAndDrop") }}
      </p>
      <div v-else class="archivo-preview">
        <p class="archivo-nombre">{{ archivo.name }}</p>
        <el-button size="small" @click="quitarArchivo">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>
    </el-upload>

    <el-progress v-if="subiendo" :percentage="progreso" />

    <el-button type="primary" @click="subirArchivo" :disabled="!archivo">
      {{ t("buttons.uploadFile") }}
    </el-button>

    <div v-if="cargaFinalizada" class="summary">
      <p class="text-gray-600">{{ mensaje }}</p>
    </div>

    <el-button v-if="empleados.length" @click="verEmpleados = !verEmpleados">
      {{ t("buttons.viewUploadedEmployees") }}
    </el-button>
    <el-table v-if="verEmpleados" :data="empleados" border stripe>
      <el-table-column prop="id" :label="t('table.id')" />
      <el-table-column prop="nombre" :label="t('table.name')" />
      <el-table-column prop="correo" :label="t('table.email')" />
    </el-table>

    <el-button v-if="errores.length" type="danger" @click="verErrores = !verErrores">
      {{ t("buttons.viewErrors") }}
    </el-button>
    <el-table v-if="verErrores" :data="errores" border stripe>
      <el-table-column prop="fila" :label="t('table.row')" />
      <el-table-column prop="mensaje" :label="t('table.error')" />
    </el-table>
  </div>
</template>

  
  <script>
import { ref } from "vue";
import { Upload, Download, Close } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import { useEmployeeStore } from "@/presentation/stores/employee.store";

export default {
  components: { Upload, Download, Close },
  setup() {
    const { t } = useI18n();
    const employeeStore = useEmployeeStore();

    const subiendo = ref(false);
    const progreso = ref(0);
    const cargaFinalizada = ref(false);
    const empleados = ref([]);
    const errores = ref([]);
    const verEmpleados = ref(false);
    const verErrores = ref(false);
    const archivo = ref(null);
    const mensaje = ref("");

    const beforeUpload = (file) => {
      if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        alert(t("uploads.invalidFormat"));
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

    const subirArchivo = async () => {
      if (!archivo.value) return;

      subiendo.value = true;
      progreso.value = 0;

      try {
        await employeeStore.uploadEmployeeFile(archivo.value);
        cargaFinalizada.value = true;
        mensaje.value = t("uploads.uploadSuccess");
      } catch (error) {
        mensaje.value = t("uploads.uploadError");
      } finally {
        subiendo.value = false;
        archivo.value = null;
      }
    };

    const downloadEmployeeFile = async () => {
      await employeeStore.downloadEmployeeTemplate();
    };

    return {
      t,
      subiendo,
      progreso,
      cargaFinalizada,
      empleados,
      errores,
      verEmpleados,
      verErrores,
      archivo,
      mensaje,
      beforeUpload,
      handleFileChange,
      quitarArchivo,
      subirArchivo,
      downloadEmployeeFile,
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
  