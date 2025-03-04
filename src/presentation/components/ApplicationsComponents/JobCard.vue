<template>
  <AddApplicancy
    v-model:dialog="isAddModalOpen"
    @employee-saved="handleEmployeeSaved"
    :idJobPosting="jobPostingId"
  />
  <div class="job-list">
    <el-card
      v-for="job in jobStore.jobPostings"
      :key="job.id"
      class="job-card"
      style="max-width: 480px; margin: 20px"
    >
      <template #header>
        <div class="card-header flex justify-between">
          <span class="font-semibold">{{ job.jobTitleId }}</span>
        </div>
      </template>
      <div class="card-content text-sm text-gray-600">
        <p><strong>Salario:</strong> {{ job.salaryRange }}</p>
        <p><strong>Descripción:</strong> {{ job.description }}</p>
        <p><strong>Requerimientos:</strong></p>
        <ul>
          <li v-for="(requirement, index) in job.requirements" :key="index">- {{ requirement }}</li>
        </ul>
      </div>
      <template #footer>
        <el-button type="primary" @click="openAddModal(job.id || 0)">
          Aplicar ahora
        </el-button>
      </template>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useJobPostingStore } from "@/presentation/stores/jobPostings.store";
import AddApplicancy from "../employeePotential/addApplicancy.vue";

const jobStore = useJobPostingStore();
const isAddModalOpen = ref(false);
const jobPostingId = ref<number | null>(null);

const openAddModal = (idJobPosting: number) => {
  if (idJobPosting >= 0) {
    jobPostingId.value = idJobPosting;
    isAddModalOpen.value = true;
  }
};

const handleEmployeeSaved = () => {
  isAddModalOpen.value = false;
};

onMounted(async () => {
  if (jobStore.jobPostings.length === 0) {
    await jobStore.fetchJobPostingsCopy();
  }
});
</script>

<style>
.job-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.job-card {
  max-width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}
</style>