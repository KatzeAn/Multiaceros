<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">{{ t("employees") }}</h2>
    <el-input v-model="searchQuery" :placeholder="t('searchEmployee')" clearable class="mb-4" />

    <el-table :data="filteredData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column :label="t('name')" prop="fullName" width="150" />
      <el-table-column :label="t('email')" prop="email" align="center" width="150" />
      <el-table-column :label="t('jobTitle')" prop="jobTitle" align="center" width="150" />
      <el-table-column :label="t('department')" prop="division" align="center" width="150" />

      <el-table-column prop="isActive" :label="t('status')" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? t("active") : t("inactive") }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="t('actions')" align="center" width="150">
        <template #default="scope">
          <el-button size="small" @click="openUploadModal">
            {{ t("uploadContract") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isUploadModalOpen">
      <UploadContractModal />
    </el-dialog>
  </div>
</template>
  
  <script lang="ts" setup>
  import { onMounted, ref, computed } from "vue";
  import { useEmployeeViewModel } from "@/presentation/viewmodels/employeeViewModel";
  import UploadContractModal from "@/presentation/components/UploadContractModal.vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n()
  
  const { paginatedData, loadEmployee } = useEmployeeViewModel();
  const isUploadModalOpen = ref(false);
  const searchQuery = ref("");
  
  const openUploadModal = () => {
    isUploadModalOpen.value = true;
  };
  
  const filteredData = computed(() => {
    if (!searchQuery.value) return paginatedData.value;
    const query = searchQuery.value.toLowerCase();
    return paginatedData.value.filter(employee =>
      employee.fullName.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query)
    );
  });
  
  onMounted(() => {
    loadEmployee();
  });
  </script>