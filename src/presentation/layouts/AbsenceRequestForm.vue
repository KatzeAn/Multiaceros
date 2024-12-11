<template>
    <el-card>
        <span class="text-2xl font-bold text-[var(--secondary-color)]">Solicitar Ausencia</span>

        <el-form label-position="top" ref="ruleFormRef" style="max-width: 600px" :model="AbsenceRequestForm" :rules="rules"
            label-width="auto" class="mt-6" :size="formSize" status-icon>

            <el-row :gutter="12">
                <el-col :span="12">
                    <el-form-item label="Desde" prop="from">
                        <el-date-picker v-model="AbsenceRequestForm.from" type="date" aria-label="Selecciona una fecha"
                            placeholder="Selecciona una fecha" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Hasta" prop="to">
                        <el-date-picker v-model="AbsenceRequestForm.to" type="date" aria-label="Selecciona una fecha"
                            placeholder="Selecciona una fecha" style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="Tipo de ausencia" prop="type">
                <el-select v-model="AbsenceRequestForm.type" placeholder="Tipo de ausencia">
                    <el-option label="Vacaciones" value="1" />
                    <el-option label="Cita medica" value="2" />
                </el-select>
            </el-form-item>

            <el-form-item label="Comentario" prop="comment">
                <el-input v-model="AbsenceRequestForm.comment" type="textarea" />
            </el-form-item>

            <el-form-item>
                <el-upload v-model:file-list="fileList" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
                    :on-exceed="handleExceed">
                    <el-button type="primary">Adjuntar evidencia</el-button>
                    <template #tip>
                        <div class="el-upload__tip">
                            <!-- pdf & png/jpg files with a size less than 2mb. -->
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
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { AbsenceRequest } from '@/domain/Interfaces/AbsenceRequest.interface';
import { useUserStore } from '../stores/user.store';

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>();

const { AbsenceRequestForm, CreateAbsenceRequest } = useUserStore();
const isLoading = ref(false);

// const ruleForm = reactive<AbsenceRequest>({
//   from: '',
//   to: '',
//   type: '',
//   comment: '',
//   evidencePath: 'c://file.pdf',
//   requestedById: 0
// })

const rules = reactive<FormRules<AbsenceRequest>>({
  from: [
    {
      type: 'date',
      required: true,
      message: 'Por favor selecciona una fecha',
      trigger: 'change',
    },
  ],
  to: [
    {
      type: 'date',
      required: true,
      message: 'Por favor selecciona una fecha',
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: 'Por favor selecciona un tipo de ausencia',
      trigger: 'change',
    },
  ],
  comment: [
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
      await CreateAbsenceRequest();
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
</script>