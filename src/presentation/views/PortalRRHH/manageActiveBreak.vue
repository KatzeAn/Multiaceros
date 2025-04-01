<template>
  <el-card>
    <el-button color="var(--secondary-color)" @click="dialogVisible = true">
      {{ t("addActiveBreak") }}
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      :title="t('activeBreak')"
      width="500"
      :before-close="handleClose"
    >
      <el-form
        label-position="top"
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="absenceRequestForm"
        label-width="auto"
        class="mt-6"
        :size="formSize"
        status-icon
      >
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item :label="t('date')" prop="from">
              <el-date-picker
                v-model="absenceRequestForm.StartDate"
                type="date"
                :aria-label="t('selectDate')"
                :placeholder="t('selectDate')"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('time')" prop="to">
              <el-time-picker
                v-model="absenceRequestForm.EndDate"
                value-format="HH:mm:ss"
                :placeholder="t('selectTime')"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="t('description')" prop="comment">
          <el-input v-model="absenceRequestForm.Comment" type="textarea" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ t("cancel") }}</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            {{ t("add") }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-table :data="tableData" stripe style="margin-top: 2rem; width: 100%">
      <el-table-column prop="date" :label="t('date')" width="180" />
      <el-table-column prop="name" :label="t('time')" width="180" />
      <el-table-column prop="address" :label="t('description')" />
      <el-table-column prop="address" :label="t('actions')" width="150">
        <el-button type="primary" @click="dialogVisible2 = true">{{ t("edit") }}</el-button>
        <el-button type="danger" @click="">{{ t("delete") }}</el-button>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible2"
      :title="t('activeBreak')"
      width="500"
      :before-close="handleClose"
    >
      <el-form
        label-position="top"
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="absenceRequestForm"
        label-width="auto"
        class="mt-6"
        :size="formSize"
        status-icon
      >
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item :label="t('date')" prop="from">
              <el-date-picker
                v-model="absenceRequestForm.StartDate"
                type="date"
                :aria-label="t('selectDate')"
                :placeholder="t('selectDate')"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="t('time')" prop="to">
              <el-time-picker
                v-model="absenceRequestForm.EndDate"
                value-format="HH:mm:ss"
                :placeholder="t('selectTime')"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="t('description')" prop="comment">
          <el-input v-model="absenceRequestForm.Comment" type="textarea" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible2 = false">{{ t("cancel") }}</el-button>
          <el-button type="primary" @click="dialogVisible2 = false">
            {{ t("add") }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { ComponentSize, FormInstance,  UploadProps, UploadUserFile } from 'element-plus'
import { useI18n } from "vue-i18n";
import { useAbsenceStore } from '@/presentation/stores/absence.store';

const { t } = useI18n()

const { absenceRequestForm } = useAbsenceStore();

const dialogVisible = ref(false)
const dialogVisible2 = ref(false)

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>();

const tableData = [
  {
    date: '16-12-2024',
    name: '10:00 AM',
    address: 'Pausa activa',
  },
  {
    date: '16-12-2024',
    name: '03:00 PM',
    address: 'Pausa activa',
  },
  {
    date: '17-12-2024',
    name: '10:00 AM',
    address: 'Pausa activa',
  },
  {
    date: '17-12-2024',
    name: '03:00 PM',
    address: 'Pausa activa',
  },
  {
    date: '18-12-2024',
    name: '10:00 AM',
    address: 'Pausa activa',
  },
  {
    date: '18-12-2024',
    name: '03:00 PM',
    address: 'Pausa activa',
  },
  {
    date: '19-12-2024',
    name: '10:00 AM',
    address: 'Pausa activa',
  },
  {
    date: '19-12-2024',
    name: '03:00 PM',
    address: 'Pausa activa',
  },
]

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('¿Estás seguro que quieres cerrar?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

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