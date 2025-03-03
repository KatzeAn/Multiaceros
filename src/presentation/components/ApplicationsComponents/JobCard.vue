
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
          <span class="font-semibold">{{ getJobTitle(job.jobTitleId) }}</span>
        </div>
      </template>
      <div class="card-content text-sm text-gray-600">
        <p><strong>Área:</strong> {{ getDivision(job.divisionId) }}</p>
        <p><strong>Salario:</strong> {{ job.salaryRange }}</p>
        <p>
          <strong>Tipo de contrato:</strong>
          {{ getContractType(job.contractType) }}
        </p>
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
import { onMounted, ref } from "vue";
import { useJobPostingStore } from "@/presentation/stores/jobPostings.store";
import AddApplicancy from "../employeePotential/addApplicancy.vue";
import { useJobTitleStore } from "@/presentation/stores/jobTitle.store";
import { useDivisionStore } from "@/presentation/stores/division.store";
import { useContracTypeStore } from "@/presentation/stores/contractType.store";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";


const jobTitleStore = useJobTitleStore();
const jobTitleList = ref<{ id: number; name: string }[]>([]);
const isLoadingJobTitles = ref(false);
const contractTypeList = ref<ContractType[]>([]);

const divisionStore = useDivisionStore();
const divisionList = ref<{ id: number; name: string }[]>([]);
const isLoadingDivisions = ref(false);
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
const loadData = async () => {
  try {
    const store = useContracTypeStore();
    await store.fetchContractType();
    contractTypeList.value = store.contractTypeList;

    isLoadingJobTitles.value = true;
    jobTitleList.value = await jobTitleStore.fetchJobTitles();
    isLoadingJobTitles.value = false;

    isLoadingDivisions.value = true;
    divisionList.value = await divisionStore.fetchDivision();
    isLoadingDivisions.value = false;
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
};
const getContractType = (contractTypeId: number) => {
  const contractType = contractTypeList.value.find((type) => type.id === contractTypeId);
  return contractType ? contractType.typeOfContract : "Desconocido";
};

const getJobTitle = (jobTitleId: number) => {
  const jobTitle = jobTitleList.value.find((title) => title.id === jobTitleId);
  return jobTitle ? jobTitle.name : "Desconocido";
};

const getDivision = (divisionId: number) => {
  const division = divisionList.value.find((div) => div.id === divisionId);
  return division ? division.name : "Desconocido";
};


onMounted(async () => {
  if (jobStore.jobPostings.length === 0) {
    await jobStore.fetchJobPostingsCopy();
  }
  await loadData();
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