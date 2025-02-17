<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">
        Gestionar Departamentos
      </h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form inline ref="ruleFormRef" :rules="rules" :model="divisionForm">
        <el-form-item prop="name" label="Nombre">
          <el-input
            v-model="divisionForm.name"
            placeholder="Nombre"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm(ruleFormRef)"
          >
            Crear Departamento
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="isActive" label="Estado">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones">
        <template #default="scope">
          <el-button size="small" disabled> Editar </el-button>
          <el-button :loading="isLoading" size="small" type="danger" disabled>
            Desactivar
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
      :total="divisionList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { useDepartmentViewModel } from "@/presentation/viewmodels/departmentViewModel";

const {
  divisionList,
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
  divisionForm,
} = useDepartmentViewModel();
</script>
