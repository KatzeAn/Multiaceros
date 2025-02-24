<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Gestionar Beneficios</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form inline ref="ruleFormRef" :rules="rules" :model="benefitForm">
        <el-form-item prop="nameBenefit" label="Nombre">
          <el-input
            v-model="benefitForm.nameBenefit"
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
            Crear beneficio
          </el-button>
          <el-checkbox v-model="showInactive">Mostrar Inactivos</el-checkbox>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="nameBenefit" label="Nombre" />
      <el-table-column prop="isActive" label="Estado">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'success'">
            {{ row.isActive ? "Activo" : "Activo" }}
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
            @click="deleteBenefit(scope.row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" title="Editar beneficio">
      <el-form>
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="editBenefit">Guardar Cambios</el-button>
      </template>
    </el-dialog>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="benefitList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useBenefitViewModel } from "@/presentation/viewmodels/benefitViewModel";
import {useBenefitStore} from "@/presentation/stores/benefit.store";

const benefitStore = useBenefitStore();
const {
  benefitList,
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
  benefitForm,
  showInactive,
} = useBenefitViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });

const openEditModal = (Benefit) => {
  editForm.value.id = Benefit.id;
  editForm.value.name = Benefit.nameBenefit;
  isEditModalVisible.value = true;
};

const editBenefit = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) {
    return;
  }
  try {
    await benefitStore.updateBenefitRequest(editForm.value.id, editForm.value.name);
    isEditModalVisible.value = false;
    fetchBenefit();
  } catch (error) {
    console.error(error);
  }
};

const deleteBenefit = async (id: number) => {
  try {
    await benefitStore.deleteBenefitRequest(id);
    await fetchBenefit();
    } catch (error) {
      console.error(error);
      }
      };
      const fetchBenefit = async () => {
        const date =  await benefitStore.fetchBenefit();
        benefitList.value = date;
        };

</script>
