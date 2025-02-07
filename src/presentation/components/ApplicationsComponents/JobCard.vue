<script setup>
import { onMounted } from "vue";
import { useJobPostingStore } from "@/presentation/stores/jobPostings.store";

const jobStore = useJobPostingStore();

onMounted(() => {
  jobStore.fetchJobPostings();
});
</script>

<template>
  <div class="job-list">
    <el-card
      v-for="job in jobStore.jobPostings"
      :key="job.id"
      class="job-card"
      style="max-width: 480px; margin: 20px;"
    >
      <template #header>
        <div class="card-header flex justify-between">
          <span class="font-semibold">{{ job.title }}</span>
        </div>
      </template>
      <div class="card-content text-sm text-gray-600">
        <p><strong>Área:</strong> {{ job.area }}</p>
        <p><strong>Salario:</strong> {{ job.salaryRange }}</p>
        <p><strong>Tipo de contrato:</strong> {{ job.contractType }}</p>
        <p><strong>Descripción:</strong> {{ job.description }}</p>
      </div>
      <template #footer>
        <el-button type="primary">Aplicar ahora</el-button>
      </template>
    </el-card>
  </div>
</template>
