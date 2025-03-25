<template>
  <el-row class="mb-4" :gutter="16">
    <el-col :span="24">
        <span class="font-bold text-2xl">{{ t('summary_requests') }}</span>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--success-alt-color)]">
        <el-statistic :value="approvedRequests.length">
          <template #title>
            <div style="display: inline-flex; align-items: center">
                {{ t('approved_requests') }}
                <el-tooltip effect="dark" :content="t('approved_requests_tooltip')" placement="top">
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8" :lg="8" class="mb-4 sm:mb-0">
      <div class="statistic-card bg-[var(--info-alt-color)]">
        <el-statistic :value="requests.length">
          <template #title>
            <div style="display: inline-flex; align-items: center">
                {{ t('total_requests') }}
                <el-tooltip effect="dark" :content="t('total_requests_tooltip')" placement="top">
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
  </el-row>

  <el-tabs v-model="activeTab">
      <el-tab-pane :label="t('pendings')" name="pending" >
        <el-table :data="pendingRequests"  stripe style="margin-bottom: 80px;">
          <el-table-column prop="firstName" :label="t('name')" />
          <el-table-column prop="lastName" :label="t('last_name')" />
          <el-table-column prop="position" :label="t('position')" />
          <el-table-column prop="department" :label="t('department')" />
          <el-table-column :label="t('actions')" width="200">
            <template #default="{ row }">
                <el-button type="primary" @click="openReviewModal(row)">{{ t('review') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane :label="t('approveds')" name="approved" >
        <el-table :data="approvedRequests" style="margin-bottom: 80px;" stripe>
          <el-table-column prop="firstName" :label="t('name')" />
          <el-table-column prop="lastName" :label="t('last_name')" />
          <el-table-column prop="position" :label="t('position')" />
          <el-table-column prop="department" :label="t('department')" />
          <el-table-column :label="t('status')">
            <template #default><el-tag type="success">{{ t('approved') }}</el-tag></template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane :label="t('rejecteds')" name="rejected" style="margin-bottom: 80px;">
        <el-table :data="rejectedRequests" style="margin-bottom: 80px;" stripe>
          <el-table-column prop="firstName" :label="t('name')" />
          <el-table-column prop="lastName" :label="t('last_name')" />
          <el-table-column prop="position" :label="t('position')" />
          <el-table-column prop="department" :label="t('department')" />
          <el-table-column :label="t('status')">
            <template #default><el-tag type="danger">{{ t('rejected') }}</el-tag></template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
  </el-tabs>

  <el-dialog v-model="isReviewModalVisible" :title="t('request_review')" width="500px">
    <el-form label-position="top">
      <el-form-item :label="t('email')">
          <el-input disabled />
      </el-form-item>
      <el-form-item :label="t('certifications')">
          <el-input disabled />
      </el-form-item>
      <el-form-item :label="t('request_reason')">
        <el-input type="textarea" disabled />
      </el-form-item>
    </el-form>
    <template #footer>
        <el-button @click="isReviewModalVisible = false">{{ t('close') }}</el-button>
        <el-button type="danger" @click="rejectRequest">{{ t('reject') }}</el-button>
        <el-button type="success" @click="approveRequest">{{ t('approve') }}</el-button>
    </template>
  </el-dialog>
</template>
  
  <script lang="ts" setup>
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";

const { t } = useI18n()
  
  const activeTab = ref("pending");
  const isReviewModalVisible = ref(false);
  const selectedRequest = ref({});
  
  const requests = ref([
    { id: 1, firstName: "Juan", lastName: "Pérez", position: "Desarrollador", department: "IT", email: "juan@example.com", titles: "Ingeniero", reason: "Actualizar datos", status: "pending" },
    { id: 2, firstName: "Ana", lastName: "Gómez", position: "Analista", department: "Recursos Humanos", email: "ana@example.com", titles: "Psicóloga", reason: "Corrección", status: "approved" },
    { id: 1, firstName: "Juan", lastName: "Pérez", position: "Desarrollador", department: "IT", email: "juan@example.com", titles: "Ingeniero", reason: "Actualizar datos", status: "pending" },
    { id: 2, firstName: "Ana", lastName: "Gómez", position: "Analista", department: "Recursos Humanos", email: "ana@example.com", titles: "Psicóloga", reason: "Corrección", status: "approved" },
    { id: 1, firstName: "Juan", lastName: "Pérez", position: "Desarrollador", department: "IT", email: "juan@example.com", titles: "Ingeniero", reason: "Actualizar datos", status: "pending" },
    { id: 2, firstName: "Ana", lastName: "Gómez", position: "Analista", department: "Recursos Humanos", email: "ana@example.com", titles: "Psicóloga", reason: "Corrección", status: "rejected" },
  ]);
  
  const pendingRequests = computed(() => requests.value.filter(r => r.status === "pending"));
  const approvedRequests = computed(() => requests.value.filter(r => r.status === "approved"));
  const rejectedRequests = computed(() => requests.value.filter(r => r.status === "rejected"));
  
  const openReviewModal = (request) => {
    selectedRequest.value = { ...request };
    isReviewModalVisible.value = true;
  };
  
  const approveRequest = () => {
    selectedRequest.value.status = "approved";
    isReviewModalVisible.value = false;
  };
  
  const rejectRequest = () => {
    selectedRequest.value.status = "rejected";
    isReviewModalVisible.value = false;
  };
  </script>
  
  <style scoped>
  .statistic-card {
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  </style>
  