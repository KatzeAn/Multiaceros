<template>
  <el-dialog
    :model-value="dialog"
    @update:model-value="$emit('update:dialog', $event)"
    :title="t('candidate')"
    top="6vh"
    width="90%" 
    :style="{ maxWidth: '800px' }"
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
        <el-form-item prop="numberDocument" :label="t('documentNumber')">
          <el-input
            :placeholder="t('document')"
            v-model="employeePotentialForm.numberDocument"
          />
        </el-form-item>

        <el-form-item prop="firstName" :label="t('firstName')">
          <el-input
            :placeholder="t('firstName')"
            v-model="employeePotentialForm.firstName"
          />
        </el-form-item>

        <el-form-item :label="t('middleName')">
          <el-input
            :placeholder="t('middleName')"
            v-model="employeePotentialForm.middleName"
          />
        </el-form-item>

        <el-form-item prop="surName" :label="t('lastName')">
          <el-input
            :placeholder="t('lastName')"
            v-model="employeePotentialForm.surName"
          />
        </el-form-item>

        <el-form-item prop="dateOfBirth" :label="t('dateOfBirth')">
          <el-date-picker
            v-model="employeePotentialForm.dateOfBirth"
            type="date"
            :placeholder="t('selectDate')"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item prop="email" :label="t('email')">
          <el-input
            :placeholder="t('email')"
            v-model="employeePotentialForm.email"
          />
        </el-form-item>

        <el-form-item prop="cellPhone" :label="t('cellphone')">
          <el-input
            :placeholder="t('cellphone')"
            v-model="employeePotentialForm.cellPhone"
          />
        </el-form-item>

        <el-form-item :label="t('attachFile')">
          <el-upload
            action=""
            :auto-upload="false"
            :file-list="fileList"
            :limit="1"
            accept=".pdf,.doc,.docx"
            @change="handleFileChange"
          >
            <el-button type="primary">{{ t('selectFile') }}</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item prop="jobPostingId" :label="t('referJob')">
          <el-select
            v-model="employeePotentialForm.jobPostingId"
            :placeholder="t('selectReferJob')"
          >
            <el-option
              v-for="jobPosting in jobPostingList"
              :key="jobPosting.id"
              :label="jobPosting.jobTitleName"
              :value="jobPosting.id"
            />
          </el-select>
        </el-form-item>
      </div>

      <el-form-item class="mt-12">
        <el-button :loading="isLoading" type="success" @click="handleSubmit">
          {{ t('sendRequest') }}
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
import type { UploadFile } from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n()


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
  const fileList = ref<UploadFile[]>([]);

const handleFileChange = (file: UploadFile) => {
  if (file.raw) {
    fileList.value = [file]; 
    uploadedFile.value = file.raw;
  }
};


</script>
