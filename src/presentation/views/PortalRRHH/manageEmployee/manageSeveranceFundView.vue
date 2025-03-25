<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">
        {{ t("manageSeveranceFunds") }}
      </h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form
        inline
        ref="ruleFormRef"
        :rules="rules"
        :model="severanceFundForm"
        class="flex flex-wrap items-center justify-between"
      >
        <div class="flex flex-col items-center gap-4">
          <el-form-item prop="severanceFundName" :label="t('name')">
            <el-input
              v-model="severanceFundForm.severanceFundName"
              :placeholder="t('newName')"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button :loading="isLoading" type="primary" @click="submitForm(ruleFormRef)">
              {{ t("createPensionFund") }}
            </el-button>
          </el-form-item>
        </div>
        <el-checkbox v-model="showInactive"> {{t("showInactive") }} </el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="severanceFundName" :label="t('newName')" align="center"/>
      <el-table-column prop="isActive" :label="t('status')" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'" align="center">
            {{ row.isActive ? t('active') : t('inactive')  }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('actions')" align="center" width="150">
        <template #default="scope">
          <el-button size="small" @click="openEditModal(scope.row)">
            {{ t("edit") }}
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!scope.row.isActive"
            @click="deleteSeveranceFund(scope.row.id)"
          >
            {{ t("deactivate") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" :title="t('editSeveranceFund')" top="6vh" width="90%" :style="{ maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }">
      <el-form :label-position="isSmallScreen ? 'top' : 'left'">
        <el-form-item :label="t('newName')">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false" :size="isSmallScreen ? 'small' : 'default'">
          {{ t("cancel") }}
        </el-button>
        <el-button type="primary" @click="editSeveranceFund" :size="isSmallScreen ? 'small' : 'default'">
          {{ t("saveChanges") }}
        </el-button>
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
import { ref, onMounted, computed } from "vue";
import { useSeveranceFundViewModel } from "@/presentation/viewmodels/severanceFundViewModel";
import {useSeveranceFundStore} from "@/presentation/stores/severanceFund.store"
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const isSmallScreen = computed(() => window.innerWidth < 800);

const  severanceStore = useSeveranceFundStore()
const {
  severanceFundList,
  isLoading,
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
  loadSeveranceFund
} = useSeveranceFundViewModel();

const isEditModalVisible = ref(false);
const editForm = ref({ id: null, name: "" });
const originalEditForm = ref({ id: null, name: "" });

const openEditModal = (severanceFund) => {
  editForm.value = { id: severanceFund.id, name: severanceFund.severanceFundName };
  originalEditForm.value = { ...editForm.value };
  isEditModalVisible.value = true;
};

const editSeveranceFund = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) return;
  if (editForm.value.id !== originalEditForm.value.id || editForm.value.name !== originalEditForm.value.name) {
    try {
      await severanceStore.updateSeveranceFundRequest(editForm.value.id, editForm.value.name);
      isEditModalVisible.value = false;
      loadSeveranceFund();
    } catch (error) {
      console.error(error);
    }
  }
};

const deleteSeveranceFund = async (id: number) => {
  try {
    await severanceStore.deleteSeveranceFundsRequest(id);
    await loadSeveranceFund();
    }catch(error){
      console.error(error);
  }
  }
</script>
