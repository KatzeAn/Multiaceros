<template>
  <!-- MODAL PARA AÑADIR EMPLEADO -->
  <el-dialog v-model="isAddModalOpen" title="Añadir Nuevo Empleado" top="6vh">
    <AddEmployee
      @close-form="closeForm"
      @employee-saved="handleEmployeeSaved"
    />
  </el-dialog>
  <!-- MODAL PARA EDITAR EMPLEADO -->
<el-dialog v-model="isEditModalOpen" title="Editar Empleado" top="6vh">
  <EditEmployee
    v-if="selectedEmployee"
    :employee="selectedEmployee"
    @close-form="closeEditForm"
    @employee-updated="handleEmployeeUpdated"
  />
</el-dialog>

  <el-card shadow="never">
    <template #header>
      <div class="flex flex-row justify-between">
        <h2 class="text-xl text-gray-700 font-semibold">Gestionar Empleados</h2>
        <el-button type="primary" icon="Plus" @click="openAddModal">
          Agregar Empleado
        </el-button>
      </div>
    </template>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column label="Nombre" prop="fullName" />
      <el-table-column label="Correo Electrónico" prop="email" />
      <el-table-column label="Cargo" prop="jobTitle" />
      <el-table-column label="Departamento" prop="division" />
      <el-table-column prop="isActive" label="Estado">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones">
        <template #default="scope">
<el-table-column label="Acciones">
  
  <template #default="scope">
    <el-button size="small"  @click="openEditModal(scope.row)">
          Editar
        </el-button>
          <el-button 
            :loading="isLoading"
            size="small" 
            type="danger" 
            @click="deactivateEmployee(scope.row.id)"
            :disabled="!scope.row.isActive" 
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>

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
