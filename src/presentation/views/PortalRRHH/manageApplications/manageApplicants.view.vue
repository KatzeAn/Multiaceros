<template>
  <addEmployeePotential
    v-model:dialog="isAddModalOpen"
    @employee-saved="handleEmployeeSaved"
  />

  <el-card shadow="never">
    <template #header>
      <div class="flex flex-row justify-between">
        <h2 class="text-xl text-gray-700 font-semibold">
          Todos los candidatos
        </h2>
        <el-button type="primary" icon="Plus" @click="openAddModal">
          Referir candidato
        </el-button>
      </div>
    </template>

    <el-card shadow="never" class="mb-6"> </el-card>

    <el-table
      :data="paginatedData"
      border
      class="w-full min-h-96 mb-4"
      stripe
      @row-click="handleRowClick"
    >
      <el-table-column label="Nombre">
        <template #default="{ row }">
          {{ `${row.firstName} ${row.surName}` }}
        </template>
      </el-table-column>
      <el-table-column prop="nameArl" label="Cargo aplicado" />
      <el-table-column label="Etapa">
        <template #default="{ row }">
          {{ EmployeePotentialStatusEnum[row.status] }}
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Correo electrónico" />
      <el-table-column prop="cellPhone" label="Celular" />
    </el-table>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="employeePotentialList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>

  <!-- Pasamos el número de documento como prop -->
  <DetailPotentialEmployee
    v-model:drawer="drawer"
    :handleClose="handleClose"
    :documentNumber="selectedDocumentNumber"
  />
</template>

<script lang="ts" setup>
import { EmployeePotentialStatusEnum } from "@/presentation/common/enum/employeePotentialStatus";
import DetailPotentialEmployee from "@/presentation/components/employeePotential/detailPotentialEmployee.vue";
import addEmployeePotential from "@/presentation/components/employeePotential/addEmployeePotential.vue";
import { useEmployeePotentialViewModel } from "@/presentation/viewmodels/employeePotentialViewModel";
import { ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";

const openAddModal = () => {
  isAddModalOpen.value = true;
};

const {
  employeePotentialList,
  currentPage,
  pageSize,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  loadEmployeePotential,
} = useEmployeePotentialViewModel();

const drawer = ref(false);
const isAddModalOpen = ref(false);
const selectedDocumentNumber = ref<number | null>(null);

const handleRowClick = (row: any) => {
  selectedDocumentNumber.value = row.numberDocument;
  drawer.value = true;
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("¿Estás seguro de cerrar la ventana?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const handleEmployeeSaved = () => {
  loadEmployeePotential();
  isAddModalOpen.value = false;
};

onMounted(async () => {
  await loadEmployeePotential();
});
</script>
