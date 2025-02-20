<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Gestionar Cargos</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form inline ref="ruleFormRef" :rules="rules" :model="jobTitleForm">
        <el-form-item prop="name" label="Nombre">
          <el-input
            v-model="jobTitleForm.name"
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
            Crear cargo
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
          <el-button size="small" @click="openEditModal(scope.row)">
            Editar
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!scope.row.isActive"
            @click="deleteJob(scope.row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" title="Editar Cargo">
      <el-form>
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="editjobTitle">Guardar Cambios</el-button>
      </template>
    </el-dialog>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="jobTitles.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useJobTitleViewModel } from "@/presentation/viewmodels/jobTitleViewModel";
import {useJobTitleStore} from "@/presentation/stores/jobTitle.store";

const jobTitleStore = useJobTitleStore();
const {
  jobTitles,
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
  jobTitleForm,
} = useJobTitleViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });

const openEditModal = (jobtitle) => {
  editForm.value.id = jobtitle.id;
  editForm.value.name = jobtitle.name;
  isEditModalVisible.value = true;
};

const editjobTitle = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) {
    return;
  }
  try {
    await jobTitleStore.updateJobTitleRequest(editForm.value.id, editForm.value.name);
    isEditModalVisible.value = false;
    fetchJobTitles();
  } catch (error) {
    console.error(error);
  }
};


const deleteJob = async (id: number) => {
  try {
    await jobTitleStore.deleteJobTitleRequest(id);
    await fetchJobTitles();
    } catch (error) {
      console.error(error);
      }
      };
      const fetchJobTitles = async () => {
        const date = await jobTitleStore.fetchJobTitles();
        jobTitles.value = date;
      }
</script>
