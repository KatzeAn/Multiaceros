<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">
        {{ t("manageFamilyCompensationFunds") }}
      </h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form
        inline
        ref="ruleFormRef"
        :rules="rules"
        :model="familyCompensationFundForm"
        class="flex flex-wrap items-center justify-between"
      >
        <div class="flex flex-col items-center gap-4">
          <el-form-item prop="compensationFundName" :label="$t('name')">
            <el-input
              v-model="familyCompensationFundForm.compensationFundName"
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
        <el-checkbox v-model="showInactive"> {{ t("showInactive") }} </el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="compensationFundName" :label="t('newName')" />
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
            {{ t("edit") }}
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
    <el-dialog v-model="isEditModalVisible" :title="t('editFamilyCompensationFund')" top="6vh" width="90%" :style="{ maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }">
      <el-form label-position="isSmallScreen ? 'top' : 'left'">
        <el-form-item :label="t('newName')">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false" :size="isSmallScreen ? 'small' : 'default'">
          {{ t("cancel") }}
        </el-button>
        <el-button type="primary" @click="editFamilyCompensationFund" :size="isSmallScreen ? 'small' : 'default'">
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
      :total="familyCompensationFundList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>


<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useFamilyCompensationFundViewModel } from "@/presentation/viewmodels/familyCompensationFundViewModel";
import { useFamilyCompensationFundStore } from "@/presentation/stores/familyCompensationFund.store";
import { useI18n } from "vue-i18n";
import type { FamilyCompesationFunds } from "@/domain/Interfaces/FamilyCompesationFunds/FamilyCompesationFunds.interface";

const { t } = useI18n()

const isSmallScreen = computed(() => window.innerWidth < 800);
const familyCompensationFundStore = useFamilyCompensationFundStore();
const {
  familyCompensationFundList,
  isLoading,
  currentPage,
  pageSize,
  ruleFormRef,
  rules,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  submitForm,
  familyCompensationFundForm,
  showInactive,
  loadFamilyCompensationFund
} = useFamilyCompensationFundViewModel();

const isEditModalVisible = ref(false);
const editForm = ref<{ id: number | null; name: string }>({ id: null, name: "" });
const originalEditForm = ref<{ id: number | null; name: string }>({ id: null, name: "" });

const openEditModal = (fund: FamilyCompesationFunds) => {
  editForm.value.id = fund.id ?? null;
  editForm.value.name = fund.compensationFundName;
  originalEditForm.value = { ...editForm.value };
  isEditModalVisible.value = true;
};

const editFamilyCompensationFund = async () => {
  if (!editForm.value.id || !editForm.value.name.trim()) return;
  if (editForm.value.id !== originalEditForm.value.id || editForm.value.name !== originalEditForm.value.name) {
    try {
      await familyCompensationFundStore.updateFamilyCompensationFundsRequest(
        editForm.value.id,
        editForm.value.name
      );
      isEditModalVisible.value = false;
      loadFamilyCompensationFund();
    } catch (error) {
      console.error(error);
    }
  }
};

const deleteFamilyFund = async (id: number) => {
  try {
    await familyCompensationFundStore.deleteFamilyCompesationRequest(id);
   await loadFamilyCompensationFund();
  } catch (error) {
    console.error(error);
  }
};

</script>