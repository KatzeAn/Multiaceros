<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Gestionar Fondos de pensión</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form inline ref="ruleFormRef" :rules="rules" :model="pensionFundForm" class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <el-form-item prop="pensionFundName" label="Nombre">
            <el-input v-model="pensionFundForm.pensionFundName" placeholder="Nombre" clearable />
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoading" type="primary" @click="submitForm(ruleFormRef)">
              Crear fondo
            </el-button>
          </el-form-item>
        </div>
        <el-checkbox v-model="showInactive">Mostrar Inactivos</el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="pensionFundName" label="Nombre" align="center" />
      <el-table-column prop="isActive" label="Estado" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones" align="center">
        <template #default="scope">
          <el-button size="small" @click="openEditModal(scope.row)">
            Editar
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!scope.row.isActive"
            @click="deleteFund(scope.row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" title="Editar Fondo de Pension">
      <el-form>
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="editPensionFund">Guardar Cambios</el-button>
      </template>
    </el-dialog>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="pensionFundList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>


<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { usePensionFundViewModel } from "@/presentation/viewmodels/pensionFundViewModel";
import { usePensionFundStore } from "@/presentation/stores/pensionFund.store";

const pensionFundStore = usePensionFundStore();
const {
  pensionFundList,
  isLoading,
  currentPage,
  pageSize,
  ruleFormRef,
  rules,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  submitForm,
  pensionFundForm,
  showInactive,
  loadPensionFund
} = usePensionFundViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });
const originalEditForm = ref({ id: null, name: "" });

const openEditModal = (pensionFund) => {
  editForm.value.id = pensionFund.id;
  editForm.value.name = pensionFund.pensionFundName;
  originalEditForm.value = {...editForm.value}
  isEditModalVisible.value = true;
};

const editPensionFund = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) return;
  if (editForm.value.id !== originalEditForm.value.id || editForm.value.name !== originalEditForm.value.name) {
    try {
      await pensionFundStore.updatePensionFundRequest(editForm.value.id, editForm.value.name);
      isEditModalVisible.value = false;
      loadPensionFund();
    } catch (error) {
      console.error(error);
    }
  }
};

const deleteFund = async (id: number) => {
  try {
    await pensionFundStore.deletePensionFundRequest(id);
    await loadPensionFund();
  } catch (error) {
    console.error("Error al eliminar el fondo de pensión", error);
  }
};

onMounted(loadPensionFund)
</script>
