<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Todos los candidatos</h2>
    </template>

    <el-card shadow="never" class="mb-6"> </el-card>

    <el-table
      :data="paginatedData"
      border
      class="w-full min-h-96 mb-4"
      stripe
      @row-click="drawer = true"
    >
      <el-table-column label="Nombre">
        <template #default="{ row }">
          {{ row.email }}
        </template>
      </el-table-column>
      <el-table-column prop="nameArl" label="Cargo aplicado" />
      <el-table-column prop="nameArl" label="Etapa" />
      <el-table-column prop="nameArl" label="Correo eléctronico" />
      <el-table-column prop="nameArl" label="Celular" />
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

  <DetailPotentialEmployee v-model:drawer="drawer" :handleClose="handleClose" />
</template>

<script lang="ts" setup>
import DetailPotentialEmployee from "@/presentation/components/employeePotential/detailPotentialEmployee.vue";
import { useEmployeePotentialViewModel } from "@/presentation/viewmodels/employeePotentialViewModel";
import { ElMessageBox } from "element-plus";
import { ref } from "vue";

const {
  employeePotentialList,
  isLoading,
  search,
  currentPage,
  pageSize,
  ruleFormRef,
  rules,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  submitForm,
  employeePotentialForm,
} = useEmployeePotentialViewModel();

const drawer = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("¿Estás seguro de cerrar la ventana?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style scoped>
.right-chevron {
  clip-path: polygon(87% 2%, 100% 50%, 87% 97%, 0 100%, 13% 49%, 0 0);
}
</style>
