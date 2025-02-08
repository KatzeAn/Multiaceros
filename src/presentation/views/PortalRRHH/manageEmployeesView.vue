<template>
  <!-- MODAL PARA AÑADIR EMPLEADO -->
  <el-dialog v-model="isAddModalOpen" title="Añadir Nuevo Empleado" top="6vh">
    <AddEmployee @close-form="closeForm" />
  </el-dialog>

  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Gestionar Empleados</h2>
      <el-button type="primary" icon="Plus" @click="openAddModal">
        Agregar Empleado
      </el-button>
    </div>

    <el-card class="p-7">
      <el-button
        icon="Delete"
        type="danger"
        class="mb-4"
        :disabled="!selectedRows.length"
        @click="deleteSelected"
      >
        Eliminar Seleccionados
      </el-button>

      <el-table
        :data="paginatedData"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <!-- Checkbox para seleccionar múltiples filas -->
        <el-table-column type="selection" width="55" />

        <el-table-column label="Nombre" prop="fullName" />
        <el-table-column label="Correo Electrónico" prop="email" />
        <el-table-column label="Cargo" prop="jobTitle" />
        <el-table-column label="Departamento" prop="division" />
        <el-table-column label="Estado" prop="status">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'danger'">
              {{ row.isActive ? "Activo" : "Inactivo" }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Buscar..."
              clearable
            />
          </template>
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              Editar
            </el-button>
            <el-popconfirm
              width="220"
              icon="InfoFilled"
              icon-color="#626AEF"
              title="¿Estás seguro de eliminar?"
              @cancel="onCancel"
            >
              <template #reference>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  Eliminar
                </el-button>
              </template>
              <template #actions="{ confirm, cancel }">
                <el-button size="small" @click="cancel">No</el-button>
                <el-button
                  type="danger"
                  size="small"
                  :disabled="!clicked"
                  @click="confirm"
                >
                  Sí
                </el-button>
              </template>
            </el-popconfirm>
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
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useEmployeeStore } from "@/presentation/stores/employee.store";
import AddEmployee from "@/presentation/views/PortalRRHH/components/AddEmployee.vue";
import type { BasicEmployee } from "@/domain/Interfaces/Employee/basicEmployee.interface";

// interface User {
//   name: string;
//   email: string;
//   jobTitle: string;
//   department: string;
//   status: boolean;
// }

// Estado para el modal de añadir empleado
const isAddModalOpen = ref(false);

// Función para abrir el modal
const openAddModal = () => {
  isAddModalOpen.value = true;
};

// Función para cerrar el modal
const closeForm = () => {
  isAddModalOpen.value = false;
};

const clicked = ref(false);
function onCancel() {
  clicked.value = true;
}

const search = ref("");
const currentPage = ref(1);
const pageSize = ref(10); // Número de filas por página
const selectedRows = ref<BasicEmployee[]>([]); // Almacena las filas seleccionadas

const filterTableData = computed(() =>
employeeList.value.filter(
    (data) =>
      !search.value ||
      data.fullName.toLowerCase().includes(search.value.toLowerCase())
  )
);

// Obtener solo los datos de la página actual
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filterTableData.value.slice(start, start + pageSize.value);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1; // Reiniciar a la primera página
};

const handleSelectionChange = (rows: BasicEmployee[]) => {
  selectedRows.value = rows;
};

const deleteSelected = () => {
  selectedRows.value.forEach((row) => {
    const index = employeeList.value.findIndex((item) => item.email === row.email);
    if (index !== -1) {
      employeeList.value.splice(index, 1);
    }
  });
  selectedRows.value = [];
};

const handleEdit = (index: number, row: BasicEmployee) => {
  console.log("Editar:", index, row);
};

const handleDelete = (index: number, row: BasicEmployee) => {
  const idx = employeeList.value.findIndex((item) => item.email === row.email);
  if (idx !== -1) {
    employeeList.value.splice(idx, 1);
  }
};

const loading = ref(true);
const employeeList = ref<BasicEmployee[]>([]);

const loadData = async () => {
  const { loading: isLoading, employeeList: userEmployeeList } = await useEmployeeStore().fetchEmployee();
  loading.value = isLoading;
  employeeList.value = userEmployeeList;
};

onMounted(() => {
  loadData();
});
</script>
