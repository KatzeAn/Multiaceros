<template>
  <!-- Datos personales -->
  <div class="flex items-center my-6">
    <div class="flex-grow border-t border-gray-300"></div>
    <span class="mx-4 font-bold">Datos personales</span>
    <div class="flex-grow border-t border-gray-300"></div>
  </div>

  <el-row :gutter="30">
    <el-col :span="8">
      <el-form-item label="Número de Documento" prop="userData.numberDocument">
        <el-input
          type="number"
          v-model="employeeRequestForm.userData.numberDocument"
        />
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="Primer Nombre" prop="userData.userFirstName">
        <el-input v-model="employeeRequestForm.userData.userFirstName" />
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="Segundo Nombre" prop="userData.userMiddleName">
        <el-input v-model="employeeRequestForm.userData.userMiddleName" />
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="8">
      <el-form-item label="Primer Apellido" prop="userData.surName">
        <el-input v-model="employeeRequestForm.userData.surName" />
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="Tipo de Sangre" prop="bloodTypeId">
        <el-select v-model="employeeRequestForm.bloodTypeId" placeholder="Seleccione el tipo de sangre">
          <el-option
            v-for="bloodType in bloodTypeStore.bloodTypeList"
            :key="bloodType.id"
            :label="bloodType.name"
            :value="bloodType.id"
          />
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="8">
      <el-form-item label="Fecha de nacimiento" prop="userData.birthday">
        <el-date-picker
          v-model="employeeRequestForm.userData.birthday"
          type="date"
          placeholder="Seleccione una fecha"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>
  </el-row>

  <el-row :gutter="30">
    <el-col :span="8">
      <el-upload v-model:file-list="fileList">
        <el-button disabled type="primary">Subir Foto del empleado</el-button>
      </el-upload>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useBloodTypeStore } from "@/presentation/stores/bloodType.store";
import type { UploadUserFile } from "element-plus";
import type { EmployeeRequest } from "@/domain/Interfaces/Employee/EmployeeRequest.interface";

const props = defineProps<{
  employeeRequestForm: EmployeeRequest;
}>();

const bloodTypeStore = useBloodTypeStore();
const fileList = ref<UploadUserFile[]>([]);
const loading = ref(false);

const loadData = async () => {
  loading.value = true;
  await bloodTypeStore.fetchBloodType(true);
  loading.value = bloodTypeStore.isLoading;
};

onMounted(() => {
  loadData();
});

</script>