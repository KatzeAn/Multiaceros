<template>
    <el-row :gutter="30">
        <el-col :span="12">
            <el-card>
                <span class="text-2xl font-bold text-[var(--secondary-color)]">Registrar Certificado</span>

                <el-form label-position="top" ref="ruleFormRef" style="max-width: 600px" :model="AbsenceRequestForm"
                    label-width="auto" class="mt-6" :size="formSize" status-icon>

                    <el-form-item label="Nombre del certificado" prop="comment">
                        <el-input v-model="AbsenceRequestForm.comment" type="text" />
                    </el-form-item>

                    
                    <el-form-item label="Descripción" prop="comment">
                        <el-input v-model="AbsenceRequestForm.comment" type="textarea" />
                    </el-form-item>

                    <el-row :gutter="12">
                        <el-col :span="12">
                            <el-form-item label="Fecha de Creación" prop="from">
                                <el-date-picker v-model="AbsenceRequestForm.from" type="date" aria-label="Selecciona una fecha"
                                    placeholder="Selecciona una fecha" style="width: 100%" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Fecha de Expiración" prop="to">
                                <el-date-picker v-model="AbsenceRequestForm.to" type="date" aria-label="Selecciona una fecha"
                                    placeholder="Selecciona una fecha" style="width: 100%" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="Código de Certificación" prop="comment">
                        <el-input v-model="AbsenceRequestForm.comment" type="text" />
                    </el-form-item>

                    <el-form-item>
                        <el-upload v-model:file-list="fileList" class="upload-demo"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
                            :on-exceed="handleExceed">
                            <el-button type="primary">Adjuntar Archivo</el-button>
                            <template #tip>
                                <div class="el-upload__tip">
                                    <!-- pdf & png/jpg files with a size less than 2mb. -->
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="Empleado" prop="type">
                        <el-select v-model="AbsenceRequestForm.type" placeholder="Seleccionar empleado">
                            <el-option label="Wilmar Alfaro" value="Wilmar Alfaro" />
                            <el-option label="Lorena Yara" value="Lorena Yara" />
                            <el-option label="Jhon Alfaro" value="Jhon Alfaro" />
                            <el-option label="Eduardo Fuentes" value="Eduardo Fuentes" />
                            <el-option label="Diego" value="Diego" />
                            <el-option label="Oscar Fuentes" value="Oscar Fuentes" />
                            <el-option label="Harol Guzman" value="Harol Guzman" />
                        </el-select>
                    </el-form-item>

                    

                    <el-form-item>
                        <el-button :loading="isLoading" class="mt-6" size="large" color="var(--secondary-color)" round
                            @click="submitForm(ruleFormRef)">
                            Registrar
                        </el-button>
                        <el-button class="mt-6" size="large" @click="resetForm(ruleFormRef)" round>
                            Limpiar
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="12">

            <el-card>
                <div class="flex flex-col gap-6">
                    <span class="text-2xl font-bold text-[var(--secondary-color)]">Certificados de Nuestra Empresa</span>
                    
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Filtre los certificados por empleado"
                        placement="top"
                    >
                        <el-select
                            v-model="value"
                            filterable
                            placeholder="Seleccionar empleado"
                            style="width: 240px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-tooltip>
                </div>

                <el-scrollbar height="526px">
                    <el-card class="my-6" body-class="bg-[var(--gray-color)]" shadow="hover">
                        <div class="flex flex-row">
                            <el-image>
                                <template #error>
                                    <div class="image-slot">
                                        <span class="material-symbols-outlined text-9xl">
                                            image
                                        </span>
                                    </div>
                                </template>
                            </el-image>
                            <div class="flex flex-col font-bold">
                                <span>Iso: 3001</span>
                                <span>Certification for quality management system</span>
                                <span>Exp: 01/01/2023 - 30/05/2029</span>
                                <span>Certification for quality system</span>
                                <span>Quality</span>
                                <span>Link: https://</span>
                                <span>Empleado: Oscar</span>
                                <div>
                                    <el-button type="success" @click="">Editar</el-button>
                                    <el-button type="danger" @click="">Eliminar</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>

                    <el-card class="my-6" body-class="bg-[var(--gray-color)]" shadow="hover">
                        <div class="flex flex-row">
                            <el-image>
                                <template #error>
                                    <div class="image-slot">
                                        <span class="material-symbols-outlined text-9xl">
                                            image
                                        </span>
                                    </div>
                                </template>
                            </el-image>
                            <div class="flex flex-col font-bold">
                                <span>Iso: 3001</span>
                                <span>Certification for quality management system</span>
                                <span>Exp: 01/01/2023 - 30/05/2029</span>
                                <span>Certification for quality system</span>
                                <span>Quality</span>
                                <span>Link: https://</span>
                                <span>Empleado: Harold</span>
                                <div>
                                    <el-button type="success" @click="">Editar</el-button>
                                    <el-button type="danger" @click="">Eliminar</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>

                    <el-card class="my-6" body-class="bg-[var(--gray-color)]" shadow="hover">
                        <div class="flex flex-row">
                            <el-image>
                                <template #error>
                                    <div class="image-slot">
                                        <span class="material-symbols-outlined text-9xl">
                                            image
                                        </span>
                                    </div>
                                </template>
                            </el-image>
                            <div class="flex flex-col font-bold">
                                <span>Iso: 3001</span>
                                <span>Certification for quality management system</span>
                                <span>Exp: 01/01/2023 - 30/05/2029</span>
                                <span>Certification for quality system</span>
                                <span>Quality</span>
                                <span>Link: https://</span>
                                <span>Empleado: Eduardo</span>
                                <div>
                                    <el-button type="success" @click="">Editar</el-button>
                                    <el-button type="danger" @click="">Eliminar</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-scrollbar>
            </el-card>
        </el-col>
    </el-row>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { AbsenceRequest } from '@/domain/Interfaces/Absence/AbsenceRequest.interface';
import { useUserStore } from '../../stores/user.store';

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>();

const { AbsenceRequestForm, CreateAbsenceRequest } = useUserStore();
const isLoading = ref(false);

const value = ref('')
const options = [
  {
    value: 'Todos',
    label: 'Todos',
  },
  {
    value: 'Wilmar Alfaro',
    label: 'Wilmar Alfaro',
  },
  {
    value: 'Jhon Alfaro',
    label: 'Jhon Alfaro',
  },
  {
    value: 'Oscar Fuentes',
    label: 'Oscar Fuentes',
  },
  {
    value: 'Eduardo Fuentes',
    label: 'Eduardo Fuentes',
  },
  {
    value: 'Harol Guzman',
    label: 'Harol Guzman',
  },
]

const submitForm = async (formEl: FormInstance | undefined) => {
  
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