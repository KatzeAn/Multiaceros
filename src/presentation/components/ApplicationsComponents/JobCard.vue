<template>
  <AddApplicancy v-model:dialog="isAddModalOpen" @employee-saved="isAddModalOpen = false" :idJobPosting="jobPostingId" />

  <div class="job-list">
    <el-card v-for="job in paginatedJobs" :key="job.id" class="job-card">
      <template #header>
        <div class="card-header flex justify-between">
          <span class="font-semibold">{{ job.jobTitleName }}</span>
        </div>
      </template>
      <div class="card-content text-sm text-gray-600">
        <p><strong>{{ t('salario') }}:</strong> {{ formatSalary(job.salaryRange) }}</p>
        <p><strong>{{ t('descripcion') }}:</strong></p>
        <p>
          {{ expandedDescriptions[job.id] ? job.description : job.description.slice(0, 100) + '...' }}
          <el-button text @click="toggleDescription(job.id)">
            {{ expandedDescriptions[job.id] ? t('verMenos') : t('verMas') }}
          </el-button>
        </p>
        <p><strong>{{ t('requerimientos') }}:</strong></p>
        <ul>
          <li v-for="(requirement, index) in job.requirements" :key="index">- {{ requirement }}</li>
        </ul>
      </div>
      <template #footer>
        <el-button type="primary" @click="openAddModal(job.id)">{{ t('aplicarAhora') }}</el-button>
      </template>
    </el-card>
  </div>

  <div class="pagination-container">
    <el-pagination v-model:current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="jobStore.jobPostings.length" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue";
import { useJobPostingStore } from "@/presentation/stores/jobPostings.store";
import AddApplicancy from "../employeePotential/addApplicancy.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const jobStore = useJobPostingStore();
const isAddModalOpen = ref(false);
const jobPostingId = ref<number | null>(null);
const expandedDescriptions = reactive<Record<number, boolean>>({});
const currentPage = ref(1);
const pageSize = ref(window.innerWidth < 800 ? 2 : 6);

const formatSalary = (salary: string | number) => salary ? new Intl.NumberFormat('es-CO').format(Number(salary)) : 'No especificado';

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return jobStore.jobPostings.slice(start, start + pageSize.value);
});

const updatePageSize = () => pageSize.value = window.innerWidth < 800 ? 1 : 6;

onMounted(() => {
  updatePageSize();
  window.addEventListener("resize", updatePageSize);
  if (!jobStore.jobPostings.length) jobStore.fetchJobPostingsCopy();
});

onBeforeUnmount(() => window.removeEventListener("resize", updatePageSize));

const openAddModal = (id: number) => {
  jobPostingId.value = id;
  isAddModalOpen.value = true;
};

const toggleDescription = (id: number) => expandedDescriptions[id] = !expandedDescriptions[id];
</script>

<style>
.job-list {
  display: grid;
  gap: 30px;
  justify-content: center;
  padding: 20px;
}

@media (min-width: 800px) {
  .job-list { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1200px) {
  .job-list { grid-template-columns: repeat(6, 1fr); }
}

.job-card {
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-container .el-pagination button {
  color: #f0f0f0;
  background-color: #374151; 
}

.pagination-container .el-pagination .is-active {
  background-color: #2c333f;
  color: white;
  border-radius: 5px;
}

</style>
