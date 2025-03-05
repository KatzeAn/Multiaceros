<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Gestionar ARL</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form inline ref="ruleFormRef" :rules="rules" :model="arlForm" class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <el-form-item prop="nameArl" label="Nombre">
            <el-input v-model="arlForm.nameArl" placeholder="Nombre" clearable />
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoading" type="primary" @click="submitForm(ruleFormRef)">
              Crear ARL
            </el-button>
          </el-form-item>
        </div>
        <el-checkbox v-model="showInactive">Mostrar Inactivos</el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="nameArl" label="Nombre" align="center" />
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
            @click="deleteARL(scope.row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" title="Editar ARL">
      <el-form>
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="editArl">Guardar Cambios</el-button>
      </template>
    </el-dialog>

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
import { ref } from "vue";
import { useArlViewModel } from "@/presentation/viewmodels/arlViewModel";
import { useArlStore } from "@/presentation/stores/arl.store";

const arlStore = useArlStore();
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
  showInactive,
} = useArlViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });
const originalEditForm = ref({ id: null, name: "" });

const openEditModal = (Arl) => {
  editForm.value.id = Arl.id;
  editForm.value.name = Arl.nameArl;
  originalEditForm.value = JSON.parse(JSON.stringify(editForm.value)); 
  isEditModalVisible.value = true;
};

const editArl = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) return;

  if (JSON.stringify(editForm.value) !== JSON.stringify(originalEditForm.value)) {
    try {
      await arlStore.updateArlRequest(editForm.value.id, editForm.value.name);
      isEditModalVisible.value = false;
      loadArl();
    } catch (error) {
      console.error(error);
    }
  }
};

const deleteARL = async (id: number) => {
  try {
    await arlStore.deleteArlRequest(id);
    loadArl();
  } catch (error) {
    console.error(error);
  }
};

const loadArl = async () => {
  const data = await arlStore.fetchArl();
  arlList.value = data;
};
</script>
