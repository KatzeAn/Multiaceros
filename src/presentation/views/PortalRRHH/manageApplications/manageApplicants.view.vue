<template>
    <el-card shadow="never">
      <template #header>
        <h2 class="text-xl text-gray-700 font-semibold">Todos los candidatos</h2>
      </template>
  
      <el-card shadow="never" class="mb-6">

      </el-card>
  
      <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="nameArl" label="Nombre" />
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
            <el-button :loading="isLoading" disabled size="small" type="danger">
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
        :total="arlList.length"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { useArlViewModel } from "@/presentation/viewmodels/arlViewModel";
  
  const {
    arlList,
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
    arlForm,
  } = useArlViewModel();
  </script>
  