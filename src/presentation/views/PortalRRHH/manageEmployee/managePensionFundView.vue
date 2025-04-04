<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">{{ t('managePensionFunds') }}</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form ref="ruleFormRef" :rules="rules" :model="pensionFundForm" class="flex flex-wrap items-center">
        <div class="flex flex-col items-center gap-4 mb-2 md:mb-0">
          <el-form-item prop="pensionFundName" :label="t('name')">
            <el-input v-model="pensionFundForm.pensionFundName" :placeholder="t('name')" clearable style="width: 150px;"/>
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoading" type="primary" @click="submitForm(ruleFormRef)">
              {{ t('createPensionFund') }}
            </el-button>
          </el-form-item>
        </div>
        <div class="w-full md:w-auto mt-2 md:mt-0 md:ml-auto">
          <el-checkbox v-model="showInactive">{{ t('showInactive') }}</el-checkbox>
        </div>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" :label="t('id')" />
      <el-table-column prop="pensionFundName" :label="t('name')" align="center" />
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
          <el-button :loading="isLoading" size="small" type="danger" :disabled="!scope.row.isActive" @click="deleteFund(scope.row.id)">
            {{ t('deactivate') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" :title="t('editPensionFund')" top="6vh" width="90%" :style="{ maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }">
      <el-form :label-position="isSmallScreen ? 'top' : 'left'">
        <el-form-item :label="t('newName')">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false" :size="isSmallScreen ? 'small' : 'default'">{{ t('cancel') }}</el-button>
        <el-button type="primary" @click="editPensionFund" :size="isSmallScreen ? 'small' : 'default'">{{ t('saveChanges') }}</el-button>
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
import { ref, onMounted, computed } from "vue";
import { usePensionFundViewModel } from "@/presentation/viewmodels/pensionFundViewModel";
import { usePensionFundStore } from "@/presentation/stores/pensionFund.store";
import { useI18n } from "vue-i18n";
import type { PensionFunds } from "@/domain/Interfaces/PensionFunds/pensionFunds.interface";

const { t } = useI18n()

const isSmallScreen = computed(() => window.innerWidth < 800);
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
const editForm =ref<{ id: number | null; name: string }>({ id: null, name: "" });
const originalEditForm = ref<{ id: number | null; name: string }>({ id: null, name: "" });

const openEditModal = (pensionFund: PensionFunds) => {
  editForm.value.id = pensionFund.id ?? null;
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

</script>