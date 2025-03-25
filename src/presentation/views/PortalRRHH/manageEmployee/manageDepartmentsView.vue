<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">
        {{ t('manageDepartments') }}
      </h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form
        inline
        ref="ruleFormRef"
        :rules="rules"
        :model="divisionForm"
        class="flex flex-wrap items-center justify-between"
      >
        <div class="flex flex-col items-center gap-4">
          <el-form-item prop="name" :label="t('name')">
            <el-input 
              v-model="divisionForm.name" 
              :placeholder="t('name')" 
              clearable 
            />
          </el-form-item>
          <el-form-item>
            <el-button 
              :loading="isLoading" 
              type="primary" 
              @click="submitForm(ruleFormRef)"
            >
              {{ t('createDepartment') }}
            </el-button>
          </el-form-item>
        </div>
        <el-checkbox v-model="showInactive">{{ t('showInactive') }}</el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" :label="t('id')" />
      <el-table-column prop="name" :label="t('name')" align="center" />

      <el-table-column prop="isActive" :label="t('status')" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? t('active') : t('inactive') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="t('actions')" align="center" width="150">
        <template #default="scope">
          <el-button size="small" @click="openEditModal(scope.row)">
            {{ t('edit') }}
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!scope.row.isActive"
            @click="deactivateDivision(scope.row.id)"
          >
            {{ t('deactivate') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog 
      v-model="isEditModalVisible" 
      :title="t('editDepartment')" 
      :width="isSmallScreen ? '90%' : '500px'" 
      :style="{ maxWidth: '800px' }"
    >
      <el-form :label-position="isSmallScreen ? 'top' : 'left'">
        <el-form-item :label="t('newName')">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false" :size="isSmallScreen ? 'small' : 'default'">
          {{ t('cancel') }}
        </el-button>
        <el-button type="primary" @click="editDivision" :size="isSmallScreen ? 'small' : 'default'">
          {{ t('saveChanges') }}
        </el-button>
      </template>
    </el-dialog>

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
import { ref, onMounted, computed } from "vue";
import { useDivisionStore } from "@/presentation/stores/division.store";

import { useDepartmentViewModel } from "@/presentation/viewmodels/departmentViewModel";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const isSmallScreen = computed(() => window.innerWidth < 800);
const divisionStore = useDivisionStore();
const {
  divisionList,
  isLoading,
  currentPage,
  pageSize,
  ruleFormRef,
  rules,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  submitForm,
  divisionForm,
  showInactive,
  loadDivision
} = useDepartmentViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });
const originalEditForm = ref({ id: null, name: "" });

const openEditModal = (division) => {
  editForm.value.id = division.id;
  editForm.value.name = division.name;
  originalEditForm.value = { ...editForm.value };
  isEditModalVisible.value = true;
};

const editDivision = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) return;
  if (editForm.value.id !== originalEditForm.value.id || editForm.value.name !== originalEditForm.value.name) {
    try {
      await divisionStore.updateDivisionRequest(editForm.value.id, editForm.value.name);
      isEditModalVisible.value = false;
      loadDivision(); 
    } catch (error) {
      console.error(error);
    }
  }
};

const deactivateDivision = async (id: number) => {
  try {
    await divisionStore.deleteDivisionRequest(id);
    await loadDivision();
  } catch (error) {
  }
};

onMounted(loadDivision); 
</script>