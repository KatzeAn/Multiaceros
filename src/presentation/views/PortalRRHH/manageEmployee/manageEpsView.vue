<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Gestionar EPS</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form inline ref="ruleFormRef" :rules="rules" :model="epsForm" class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <el-form-item prop="epsName" label="Nombre">
            <el-input v-model="epsForm.epsName" placeholder="Nombre" clearable />
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoading" type="primary" @click="submitForm(ruleFormRef)">
              Crear EPS
            </el-button>
          </el-form-item>
        </div>
        <el-checkbox v-model="showInactive">Mostrar Inactivos</el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="epsName" label="Nombre" align="center" />
      <el-table-column prop="isActive" label="Estado" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones" align="center">
        <template #default="scope">
          <el-button size="small" @click="openEditModal(scope.row)">Editar</el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!scope.row.isActive"
            @click="deleteEps(scope.row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" title="Editar Eps">
      <el-form>
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="editEps">Guardar Cambios</el-button>
      </template>
    </el-dialog>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="epsList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useEpsStore } from "@/presentation/stores/eps.store";
import { useEpsViewModel } from "@/presentation/viewmodels/epsViewModel";

const epsStore = useEpsStore();
const {
  epsList,
  isLoading,
  currentPage,
  pageSize,
  ruleFormRef,
  rules,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  submitForm,
  epsForm,
  showInactive,
  loadEps
} = useEpsViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });

const openEditModal = (EPS) => {
  editForm.value.id = EPS.id;
  editForm.value.name = EPS.epsName;
  isEditModalVisible.value = true;
};

const editEps = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) {
    return;
  }
  try {
    await epsStore.updateEpsRequest(editForm.value.id, editForm.value.name);
    isEditModalVisible.value = false;
    await loadEps();
  } catch (error) {
    console.error(error);
  }
};

const deleteEps = async (id: number) => {
  try {
    await epsStore.deleteEpsRequest(id); 
    await loadEps(); 
  } catch (error) {
    console.error( error);
  }
};

onMounted(loadEps); 
</script>
