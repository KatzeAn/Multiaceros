<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">
        Gestionar Fondos de cesantías
      </h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form
        inline
        ref="ruleFormRef"
        :rules="rules"
        :model="severanceFundForm"
      >
        <el-form-item prop="severanceFundName" label="Nombre">
          <el-input
            v-model="severanceFundForm.severanceFundName"
            placeholder="Nombre"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="mr-20"
          >
            Crear fondo
          </el-button>
          <el-checkbox v-model="showInactive">Mostrar Inactivos</el-checkbox>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="severanceFundName" label="Nombre" />
      <el-table-column prop="isActive" label="Estado">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones">
        <template #default="scope">
          <el-button size="small"  @click="openEditModal(scope.row)">
            Editar
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!scope.row.isActive"
            @click="deleteSeveranceFund(scope.row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" title="Editar Fondo de cesantías">
      <el-form>
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="editSeveranceFund">Guardar Cambios</el-button>
      </template>
    </el-dialog>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="severanceFundList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useSeveranceFundViewModel } from "@/presentation/viewmodels/severanceFundViewModel";
import {useSeveranceFundStore} from "@/presentation/stores/severanceFund.store"

const  severanceStore = useSeveranceFundStore()
const {
  severanceFundList,
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
  severanceFundForm,
  showInactive,
} = useSeveranceFundViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });

const openEditModal = (SeveranceFund) => {
  editForm.value.id = SeveranceFund.id;
  editForm.value.name = SeveranceFund.severanceFundName;
  isEditModalVisible.value = true;
};

const editSeveranceFund = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) {
    return;
  }
  try {
    await severanceStore.updateSeveranceFundRequest(editForm.value.id, editForm.value.name);
    isEditModalVisible.value = false;
    fetchSeveranceFund();
  } catch (error) {
    console.error(error);
  }
};

const deleteSeveranceFund =  async (id: number) => {
  try{
    await severanceStore.deleteSeveranceFundsRequest(id);
    await fetchSeveranceFund();
    }catch(error){
      console.error(error);
      }
  }

  const fetchSeveranceFund = async () => {
    const date = await severanceStore.fetchSeveranceFund();
    severanceFundList.value = date;
  }
</script>
