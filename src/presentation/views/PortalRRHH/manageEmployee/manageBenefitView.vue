<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Gestionar Beneficios</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form  inline  ref="ruleFormRef" :rules="rules"  :model="benefitForm" class="flex flex-wrap items-center justify-between" >
        <div class="flex  flex-col items-center gap-4">
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
            >
              Crear beneficio
            </el-button>
          </el-form-item>
        </div>
        <el-checkbox v-model="showInactive" @change="fetchBenefit">
          Mostrar Inactivos
        </el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="nameBenefit" label="Nombre" align="center"/>
      <el-table-column prop="isActive" label="Estado" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones" align="center" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="openEditModal(row)">
            Editar
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!row.isActive"
            @click="deleteBenefit(row.id)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" title="Editar beneficio" :width="isSmallScreen ? '90%' : '500px'" :style="{ maxWidth: '800px' }">
      <el-form :label-position="isSmallScreen ? 'top' : 'left'">
        <el-form-item label="Nuevo Nombre">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false" :size="isSmallScreen ? 'small' : 'default'">Cancelar</el-button>
        <el-button type="primary" @click="editBenefit" :size="isSmallScreen ? 'small' : 'default'">Guardar Cambios</el-button>
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
import { ref, onMounted, computed } from "vue";
import { useBenefitViewModel } from "@/presentation/viewmodels/benefitViewModel";
import { useBenefitStore } from "@/presentation/stores/benefit.store";

const isSmallScreen = computed(() => window.innerWidth < 800);

const benefitStore = useBenefitStore();
const {
  benefitList,
  isLoading,
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
const originalEditForm = ref({ id: null, name: "" });

const openEditModal = (row) => {
  editForm.value = { id: row.id, name: row.nameBenefit };
  originalEditForm.value = { ...editForm.value };
  isEditModalVisible.value = true;
};

const editBenefit = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) 
  return;
  if (editForm.value.id !== originalEditForm.value.id || editForm.value.name !== originalEditForm.value.name) {
    try {
      await benefitStore.updateBenefitRequest(editForm.value.id, editForm.value.name);
      isEditModalVisible.value = false;
      fetchBenefit();
    } catch (error) {
      console.error(error);
    }
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
  try {
    const data = await benefitStore.fetchBenefit(!showInactive.value);
    if (data) {
      benefitList.value = data;
    }
  } catch (error) {
  }
};

onMounted(fetchBenefit);
</script>
