<template>
  <el-col class="mb-4">
  <div class="bg-[var(--secondary-color)] p-6 rounded-lg shadow-lg flex justify-between">
    <el-statistic 
      :value="15"
      :value-style="{ color: 'white'}">
      <template #title>
        <div class="flex items-center gap-2 text-lg font-semibold text-white">
          Días de vacaciones disponibles 
          <el-icon :size="18">
            <Warning />
          </el-icon>
        </div>
      </template>
    </el-statistic>
  </div>
</el-col>

  <el-card>
      <span class="text-2xl font-bold text-[var(--secondary-color)]">Solicitar Ausencia</span>

      <el-form label-position="top" ref="ruleFormRef" style="max-width: 600px" :model="absenceRequestForm" :rules="rules"
          label-width="auto" class="mt-6" :size="formSize" status-icon>

          <el-row :gutter="12">
              <el-col :span="12">
                  <el-form-item label="Desde" prop="StartDate">
                      <el-date-picker v-model="absenceRequestForm.StartDate" type="date" aria-label="Selecciona una fecha"
                      placeholder="Selecciona una fecha" style="width: 100%"  :disabled-date="disabledDate"/>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="Hasta" prop="EndDate">
                      <el-date-picker v-model="absenceRequestForm.EndDate" type="date" aria-label="Selecciona una fecha"
                          placeholder="Selecciona una fecha" style="width: 100%" :disabled-date="disabledDate"/>
                  </el-form-item>
              </el-col>
          </el-row>

          <el-form-item label="Tipo de ausencia" prop="AbsenceTypeId">
          <el-select v-model="absenceRequestForm.AbsenceTypeId" placeholder="Tipo de ausencia">
            <el-option v-for="type in absenceTypes" :key="type.value"  :label="type.label"  :value="type.value" />
          </el-select>
        </el-form-item>


          <el-form-item label="Comentario" prop="Comment">
              <el-input v-model="absenceRequestForm.Comment" type="textarea" />
          </el-form-item>

          <el-form-item>
              <el-upload v-model:file-list="fileList" class="upload-demo"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                  :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
                  :on-exceed="handleExceed">
                  <el-button type="primary">Adjuntar evidencia</el-button>
                  <template #tip>
                      <div class="el-upload__tip">
                          <!-- pdf & png/jpg files with a size menos de 2MB. -->
                      </div>
                  </template>
              </el-upload>
          </el-form-item>

            <el-form-item>
                <el-button :loading="isLoading" class="mt-6" size="large" color="var(--secondary-color)" round
                    @click="submitForm(ruleFormRef)">
                    Enviar Solicitud
                </el-button>
                <el-button class="mt-6" size="large" @click="resetForm(ruleFormRef)" round>
                    Cancelar
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import type { ComponentSize, FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { AbsenceRequest } from '@/domain/Interfaces/Absence/AbsenceRequest.interface';
import { useAbsenceStore } from '../stores/absence.store';

const formSize = ref<ComponentSize>('default');
const ruleFormRef = ref<FormInstance>();

const { absenceRequestForm, createAbsenceRequest, fetchAbsenceTypes } = useAbsenceStore();

const isLoading = ref(false);
const absenceTypes = ref<{ label: string; value: string }[]>([]);

onMounted(async () => {
  try {
    const response = await fetchAbsenceTypes(); 
    console.log("Respuesta de fetchAbsenceTypes:", response); 

    if (Array.isArray(response.absenceList)) {
      absenceTypes.value = response.absenceList.map(type => ({
        label: type.name,
        value: type.id.toString(),
      }));
    } else {
    }
  } catch (error) {
  }
});



const rules = reactive<FormRules<AbsenceRequest>>({
  StartDate: [
    {
      type: 'date',
      required: true,
      message: 'Por favor selecciona una fecha',
      trigger: 'change',
    },
  ],
  EndDate: [
    {
      type: 'date',
      required: true,
      message: 'Por favor selecciona una fecha',
      trigger: 'change',
    },
  ],
  AbsenceTypeId: [
    {
      required: true,
      message: 'Por favor selecciona un tipo de ausencia',
      trigger: 'change',
    },
  ],
  Comment: [
    { required: true, message: 'Por favor ingrese un comentario', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    isLoading.value = true;
    console.log("Entra: " + isLoading.value);

    const valid = await formEl.validate();
    if (valid) {
      await createAbsenceRequest();
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  } finally {
    isLoading.value = false;
    console.log("Sale: " + isLoading.value);
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const fileList = ref<UploadUserFile[]>([
  //   {
//     name: 'element-plus-logo.svg',
//     url: 'https://element-plus.org/images/element-plus-logo.svg',
//   },
//   {
//     name: 'element-plus-logo2.svg',
//     url: 'https://element-plus.org/images/element-plus-logo.svg',
//   },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
const holidays: string[] = [
    "2025-01-01", "2025-03-24", "2025-04-17", "2025-04-18", "2025-05-01", "2025-06-02",
    "2025-06-23", "2025-06-30", "2025-07-20", "2025-08-07", "2025-08-18", "2025-10-13",
    "2025-11-03", "2025-11-17", "2025-12-08", "2025-12-25"
];

const disabledDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const formattedDate: string = date.toISOString().split("T")[0];

    return (
        date < today ||              
        date.getDay() === 0 ||      
        date.getDay() === 6 ||      
        holidays.includes(formattedDate) 
    );
};
</script>