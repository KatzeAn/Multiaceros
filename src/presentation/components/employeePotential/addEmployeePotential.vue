<template>
  <el-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    title="Candidato"
    top="6vh"
    width="90%" 
    :style="{ maxWidth: '800px' }""
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-2">
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

        <el-form-item prop="email" label="Correo electrónico">
          <el-input
            placeholder="Correo electrónico"
            v-model="employeePotentialForm.email"
          />
        </el-form-item>

        <el-form-item prop="cellPhone" label="Celular">
          <el-input
            placeholder="Celular"
            v-model="employeePotentialForm.cellPhone"
          />
        </el-form-item>

        <el-form-item label="Adjuntar archivo">
          <el-upload
            action=""
            :auto-upload="false"
            :file-list="fileList"
            :limit="1"
            accept=".pdf,.doc,.docx"
            @change="handleFileChange"
          >
            <el-button type="primary">Seleccionar archivo</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item prop="jobPostingId" label="Puesto a referir">
          <el-select
            v-model="employeePotentialForm.jobPostingId"
            placeholder="Seleccione el puesto a referir"
          >
              <el-option
                 v-for="jobPosting in jobPostingList"
                 :key="jobPosting.id"
                 :label="jobPosting.title"
                 :value="jobPosting.id"
              />
            </el-select>
        </el-form-item>
      </div>

      <el-form-item class="mt-12">
        <el-button :loading="isLoading" type="success" @click="handleSubmit">
          Enviar Solicitud
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useEmployeePotentialViewModel } from "@/presentation/viewmodels/employeePotentialViewModel";
import { useJobPostingViewModel } from "@/presentation/viewmodels/jobPostingViewModel";
import { ElNotification } from "element-plus";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  dialog: boolean;
}>();

const { jobPostingList } = useJobPostingViewModel();

const emit = defineEmits(["update:dialog", "employee-saved"]);
const handleSubmit = () => {
  if (!uploadedFile.value) {
    ElNotification({
      title: "Error",
      message: "Debe adjuntar un archivo antes de enviar el formulario.",
      type: "error",
    });
    return;
  }
  submitForm(ruleFormRef.value, (event) => emit(event as "employee-saved"));
};

const { ruleFormRef, rules, submitForm, isLoading, employeePotentialForm, uploadedFile} =
  useEmployeePotentialViewModel();
const fileList = ref([]);
const handleFileChange = (file) => {
  fileList.value = [file];
  uploadedFile.value = file.raw;
};

</script>
