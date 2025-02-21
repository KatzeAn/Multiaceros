<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">
        Gestionar Fondos de Compensación Familiar
      </h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form
        inline
        ref="ruleFormRef"
        :rules="rules"
        :model="familyCompensationFundForm"
      >
        <el-form-item prop="compensationFundName" label="Nombre">
          <el-input
            v-model="familyCompensationFundForm.compensationFundName"
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
            Crear fondo
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="compensationFundName" label="Nombre" />
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
            @click="deleteFamilyFund(scope.row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Modal para editar fondo de compensación -->
    <el-dialog v-model="isEditModalVisible" title="Editar Fondo de Compensación">
      <el-form>
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="editFamilyCompensationFund">
          Guardar Cambios
        </el-button>
      </template>
    </el-dialog>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="familyCompensationFundList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useFamilyCompensationFundViewModel } from "@/presentation/viewmodels/familyCompensationFundViewModel";
import { useFamilyCompensationFundStore } from "@/presentation/stores/familyCompensationFund.store";

const familyCompensationFundStore = useFamilyCompensationFundStore();
const {
  familyCompensationFundList,
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
  familyCompensationFundForm,
} = useFamilyCompensationFundViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });

const openEditModal = (fund) => {
  editForm.value.id = fund.id;
  editForm.value.name = fund.compensationFundName;
  isEditModalVisible.value = true;
};

const editFamilyCompensationFund = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) {
    return;
  }
  try {
    await familyCompensationFundStore.updateFamilyCompensationFundsRequest(
      editForm.value.id,
      editForm.value.name
    );
    isEditModalVisible.value = false;
    fetchFamilyCompensationFund();
  } catch (error) {
    console.error(error);
  }
};

const deleteFamilyFund = async (id: number) => {
  try {
    await familyCompensationFundStore.deleteFamilyCompesationRequest(id);
    fetchFamilyCompensationFund();
  } catch (error) {
    console.error(error);
  }
};

const fetchFamilyCompensationFund = async () => {
  const data = await familyCompensationFundStore.fetchFamilyCompensationFund();
  familyCompensationFundList.value = data;
};
</script>
