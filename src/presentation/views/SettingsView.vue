<template>
  <el-card shadow="never">
    <template #header>
      <div style="display: flex; align-items: center;">
        <el-icon><Bell /></el-icon>
        <h2 class="text-xl text-gray-700 font-semibold" style="margin-left: 8px;">
          {{ t('notificationSettings') }}
        </h2>
      </div>
      <el-checkbox v-model="showInactive" class="mt-2">{{ t('showInactive') }}</el-checkbox>
    </template>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="name" :label="t('name')" width="150" />
      <el-table-column prop="description" :label="t('description')" align="center" width="200" />
      <el-table-column :label="t('daysBefore')" align="center" width="100">
        <template #default="{ row }">
          <span v-if="row.id !== 2">{{ row.daysBefore }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="isActive" :label="$t('status')" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? t('active') : t('inactive') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('actions')" align="center" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="openEditDrawer(row)">{{ t('edit') }}</el-button>
          <el-button :loading="isLoading" size="small" type="danger" @click="toggleStatus(row)">
            {{ row.isActive ? t('deactivate') : t('activate') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer v-model="isDrawerVisible" :title="t('editNotification')" :fullscreen="isSmallScreen" :size="isSmallScreen ? '100%' : '40%'"  >
      <el-form :model="editForm" label-width="auto" style="padding: 20px;">
        <el-form-item :label="t('name')">
          <el-input v-model="editForm.name" disabled />
        </el-form-item>

        <el-form-item v-if="editForm.id !== 2" :label="$t('daysBefore')">
          <el-select v-model="editForm.daysBefore" :placeholder="$t('selectPeriod')">
            <el-option :label="t('days60')" value="60" />
            <el-option :label="t('days30')" value="30" />
            <el-option :label="t('days15')" value="15" />
            <el-option :label="t('days5')" value="5" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="editForm.id === 2" :label="t('excessVacationDays')" class="el-form-item--medium">
          <el-input v-model="editForm.excessVacationDays" type="number" min="0" />
        </el-form-item>

        <el-form-item :label="t('description')" class="el-form-item--medium">
          <el-input v-model="editForm.description" type="textarea" :rows="4" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="saveChanges">{{ t('save') }}</el-button>
          <el-button @click="isDrawerVisible = false">{{ t('cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="notificationConfigs.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useNotificationConfigStore } from "@/presentation/stores/Notifications.store";
import { useNotificationConfigViewModel } from "@/presentation/viewmodels/NotificationsViewModel";
import { Bell } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const isSmallScreen = computed(() => screenWidth.value < 800);

onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

const notificationStore = useNotificationConfigStore();
const {
  notificationConfigs,
  isLoading,
  currentPage,
  pageSize,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  loadNotifications,
  showInactive,
  userId,
} = useNotificationConfigViewModel();

const isDrawerVisible = ref(false);
const editForm = ref({
  id: null,
  name: "",
  daysBefore: "",
  excessVacationDays: "",
  isActive: false,
  description: "",
});

const openEditDrawer = (notification) => {
  editForm.value = { ...notification };
  isDrawerVisible.value = true;
};

const saveChanges = async () => {
  try {
    editForm.value.modifiedBy = userId;
    const updatedData = { ...editForm.value, notificationConfigId: editForm.value.id };
    await notificationStore.updateNotificationConfigRequest(editForm.value.id, updatedData);
    isDrawerVisible.value = false;
    await loadNotifications();
  } catch (error) {
    console.error(error);
  }
};

const toggleStatus = async (notification) => {
  try {
    const updatedData = {
      isActive: !notification.isActive,
      modifiedBy: userId,
      notificationConfigId: notification.id,
    };
    await notificationStore.updateNotificationConfigRequest(notification.id, updatedData);
    await loadNotifications();
  } catch (error) {
    console.error(error);
  }
};

onMounted(loadNotifications);
</script>
