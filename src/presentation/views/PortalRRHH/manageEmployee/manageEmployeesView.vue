<template>
  <!-- MODAL PARA AÑADIR EMPLEADO -->
  <el-dialog
  v-model="isAddModalOpen"
  :title="t('addNewEmployee')"
  top="6vh"
  width="90%"
  :style="{ maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }"
>
  <AddEmployee
    @close-form="closeForm"
    @employee-saved="handleEmployeeSaved"
  />
</el-dialog>

  <!-- MODAL PARA EDITAR EMPLEADO -->
  <el-dialog v-model="isEditModalOpen" title="Editar Empleado" top="6vh" width="90%" :style="{ maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }">
    <EditEmployee
      v-if="selectedEmployee"
      :employee="selectedEmployee"
      @close-form="closeEditForm"
      @employee-updated="handleEmployeeUpdated"
    />
  </el-dialog>

  <el-card shadow="never">
  <template #header>
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <h2 class="text-xl text-gray-700 font-semibold">{{ t('manageEmployees') }}</h2>
      <div class="flex flex-col sm:flex-row sm:items-center">
        <el-button type="primary" icon="Plus" @click="openAddModal" class="mb-2 sm:mb-0 sm:mr-4">
          {{ t('addNewEmployee') }}
        </el-button>
        <el-checkbox v-model="showInactive">{{ t('showInactive') }}</el-checkbox>
      </div>
    </div>
    </template>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column :label="t('name')" prop="fullName" />
      <el-table-column :label="t('email')" prop="email" align="center" />
    <el-table-column :label="t('jobTitle')" prop="jobTitle" align="center" />
    <el-table-column :label="t('department')" prop="division" align="center" />
  

    <el-table-column :label="t('status')" prop="isActive" align="center">
  <template #default="{ row }">
    <el-tag :type="row.isActive ? 'success' : 'danger'">
      {{ row.isActive ? t('active') : t('inactive') }}
    </el-tag>
  </template>
</el-table-column>

<el-table-column :label="t('actions')" align="center" width="150">
  <template #default="scope">
    <el-button size="small" @click="openEditModal(scope.row)">
      {{ t('edit') }}
    </el-button>
    <el-button
      :loading="isLoading"
      size="small"
      type="danger"
      @click="deactivateEmployee(scope.row.id)"
      :disabled="!scope.row.isActive"
    >
      {{ t('deactivate') }}
    </el-button>
  </template>
</el-table-column>


    </el-table>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="employeeList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import AddEmployee from "../components/AddEmployee.vue";
import EditEmployee from "../components/EditEmployee.vue";
import { useEmployeeViewModel } from "@/presentation/viewmodels/employeeViewModel";
import { useEmployeeStore } from "@/presentation/stores/employee.store";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedEmployee = ref<any>(null);
const employeeStore = useEmployeeStore();

const openAddModal = () => {
  isAddModalOpen.value = true;
};

const openEditModal = (employee: any) => {
  selectedEmployee.value = { ...employee };
  isEditModalOpen.value = true;
};

const closeForm = () => {
  isAddModalOpen.value = false;
};

const closeEditForm = () => {
  isEditModalOpen.value = false;
};

const handleEmployeeSaved = () => {
  loadEmployee();
  closeForm();
};

const handleEmployeeUpdated = () => {
  loadEmployee();
  closeEditForm();
};

const {
  employeeList,
  isLoading,
  currentPage,
  pageSize,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  loadEmployee,
  showInactive,
} = useEmployeeViewModel();

const deactivateEmployee = async (id: number) => {
  try {
    await employeeStore.deactivateEmployee(id);
    loadEmployee();
  } catch (error) {
    console.error("Error al desactivar el empleado:", error);
  }
};

</script>
