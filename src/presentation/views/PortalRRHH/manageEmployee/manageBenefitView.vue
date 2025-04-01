<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">{{ t("manageBenefit") }}</h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form  inline  ref="ruleFormRef" :rules="rules"  :model="benefitForm" class="flex flex-wrap items-center justify-between" >
        <div class="flex  flex-col items-center gap-4">
          <el-form-item prop="nameBenefit" :label="t('name')">
            <el-input
              v-model="benefitForm.nameBenefit"
              :placeholder="t('newName')"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="isLoading"
              type="primary"
              @click="submitForm(ruleFormRef)"
            >
              {{ t("createBenefit") }}
            </el-button>
          </el-form-item>
        </div>
        <el-checkbox v-model="showInactive" @change="fetchBenefit">
          {{ t("showInactive") }}
        </el-checkbox>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="nameBenefit" :label="t('name')" align="center"/>
      <el-table-column prop="isActive" :label="t('status')" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? t("active") : t("inactive") }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('actions')" align="center" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="openEditModal(row)">
            {{ t("edit") }}
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            :disabled="!row.isActive"
            @click="deleteBenefit(row.id)"
          >
            {{ t("deactivate") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isEditModalVisible" :title="t('editBenefit')"  top="6vh" width="90%" :style="{ maxWidth: '800px', maxHeight: '80vh', overflowY: 'auto' }">
      <el-form :label-position="isSmallScreen ? 'top' : 'left'">
        <el-form-item :label="t('newName')">
          <el-input v-model="editForm.name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isEditModalVisible = false" :size="isSmallScreen ? 'small' : 'default'">{{ t("cancel") }}</el-button>
        <el-button type="primary" @click="editBenefit" :size="isSmallScreen ? 'small' : 'default'">{{ t("saveChanges") }}</el-button>
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
import { useI18n } from "vue-i18n";
import type { Benefits } from "@/domain/Interfaces/Benefits/Benefits.interface";

const { t } = useI18n()

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
const editForm = ref<{ id: number | null; name: string }>({ id: null, name: "" });
const originalEditForm = ref<{ id: number | null; name: string }>({ id: null, name: "" });

const openEditModal = (row: Benefits) => {
  editForm.value.id = row.id ?? null;
  editForm.value.name = row.nameBenefit;
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

</script>
