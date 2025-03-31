<template>
 <el-button type="primary" icon="Plus" @click="isAddModalOpen = true">
  {{ t('addJobPosting') }}
</el-button>

<el-dialog v-model="isAddModalOpen" :title="t('addNewJobPosting')" width="90%" :style="{ maxWidth: '800px' }">
  <el-form ref="formRef" :model="jobPosting" label-position="top">
    <div class="grid grid-cols-1 gap-4">
      <el-form-item :label="t('title')" prop="title">
        <el-select v-model="jobPosting.jobTitleId" class="w-full">
          <el-option
            v-for="jobTitle in jobTitleList"
            :key="jobTitle.id"
            :label="jobTitle.name"
            :value="jobTitle.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('description')" prop="description">
        <el-input v-model="jobPosting.description" type="textarea" class="w-full" />
      </el-form-item>

      <el-form-item :label="t('salaryRange')" prop="salaryRange">
        <el-input 
          v-model="jobPosting.salaryRange"
          @input="formatSalaryInput('create')"
          class="w-full"
        />
      </el-form-item>

      <div class="flex flex-col md:flex-row gap-4">
        <el-form-item :label="t('newRequirement')" class="w-full md:w-4/5">
          <el-input v-model="newRequirement" :placeholder="t('enterRequirement')" class="w-full" />
        </el-form-item>
        <div class="flex items-center justify-start md:w-1/5">
          <el-button type="primary" class="w-full" @click="addRequirement">{{ t('add') }}</el-button>
        </div>
      </div>

      <div>
        <ul>
          <li
            v-for="(requirement, index) in jobPosting.requirements"
            :key="index"
            class="flex justify-between items-center py-2 border-b"
          >
            <span>{{ requirement }}</span>
            <button type="button" @click="removeRequirement(index)" class="text-red-500">
              {{ t('delete') }}
            </button>
          </li>
        </ul>
      </div>

      <el-form-item :label="t('yearsOfExperience')" prop="experienceLevel">
        <el-input-number 
          v-model="jobPosting.experienceLevel" 
          :min="1" 
          :max="30" 
          class="w-full" 
        />
      </el-form-item>

      <el-form-item :label="t('area')" prop="area">
        <el-select v-model="jobPosting.divisionId" class="w-full">
          <el-option
            v-for="division in divisionList"
            :key="division.id"
            :label="division.name"
            :value="division.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('modality')" prop="modality">
        <el-select v-model="jobPosting.modality" class="w-full">
          <el-option :label="t('onsite')" :value="1" />
          <el-option :label="t('remote')" :value="2" />
          <el-option :label="t('hybrid')" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item :label="t('contractType')" prop="contractTypeId">
      <el-select v-model="jobPosting.contractType" class="w-full">
        <el-option
          v-for="contractType in contractTypeList"
          :key="contractType.id"
          :label="contractType.typeOfContract"
          :value="contractType.id"
        />
          </el-select>
    </el-form-item>


      <el-form-item :label="t('priorityLevel')" prop="priority">
        <el-input-number v-model="jobPosting.priority" :min="1" class="w-full" />
      </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" @click="submitJobPosting">{{ t('confirm') }}</el-button>
    </el-form-item>
  </el-form>
</el-dialog>

  <!-- Tabla de Puestos de Trabajo -->
  <div class="flex justify-between items-center mb-4">
  <h2 class="text-lg font-semibold">{{ t('jobPostings') }}</h2>
  <el-checkbox v-model="showInactive">{{ t('showInactive') }}</el-checkbox>
</div>

<el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
  <el-table-column prop="title" :label="t('title')">
    <template #default="{ row }"> 
      {{ getJobTitle(row.jobTitleId) }}
    </template>
  </el-table-column>

  <el-table-column prop="area" :label="t('area')">
    <template #default="{ row }">
      {{ getDivision(row.divisionId) }}
    </template>
  </el-table-column>

  <el-table-column :label="t('salary')">
    <template #default="{ row }">
      {{ formatSalary(row.salaryRange) }}
    </template>
  </el-table-column>

  <el-table-column :label="t('contractType')">
    <template #default="{ row }">
  {{ row.contractTypeName }}
</template>
  </el-table-column>

  <el-table-column :label="t('priorityLevel')" prop="priorityText" />

  <el-table-column prop="isActive" :label="t('status')" align="center"> 
    <template #default="{ row }">
      <el-tag :type="row.isActive ? 'success' : 'danger'">
        {{ row.isActive ? t('active') : t('inactive') }}
      </el-tag>
    </template>
  </el-table-column>

  <el-table-column :label="t('actions')" width="150">
    <template #default="scope">
      <div class="flex space-x-2">
        <el-button size="small" @click="openEditModal(scope.row)">{{ t('edit') }}</el-button>
        <el-button :loading="isLoading" size="small" type="danger" :disabled="!scope.row.isActive" @click="deleteJobTitle(scope.row.id)">
          {{ t('deactivate') }}
        </el-button>
      </div>
    </template>
  </el-table-column>
</el-table>

  <!-- Modal para editar puesto -->
  <el-dialog v-model="isEditModalOpen" title="Editar Puesto de Trabajo" width="90%" :style="{ maxWidth: '800px' }">
    <el-form  ref="editFormRef" :model="selectedJobPosting">
  <el-form-item :label="t('title')" prop="title">
    <el-select v-model="selectedJobPosting.jobTitleId" class="w-full">
      <el-option
        v-for="jobTitle in jobTitleList"
        :key="jobTitle.id"
        :label="jobTitle.name"
        :value="jobTitle.id"
      />
    </el-select>
  </el-form-item>

  <el-form-item :label="t('description')" prop="description">
    <el-input v-model="selectedJobPosting.description" type="textarea" class="w-full" />
  </el-form-item>

  <el-form-item :label="t('salaryRange')" prop="salaryRange">
    <el-input 
      v-model="selectedJobPosting.salaryRange"
      @input="formatSalaryInput('edit')"
      class="w-full"
    />
  </el-form-item>

  <div class="flex flex-col md:flex-row gap-4">
    <el-form-item :label="t('newRequirement')" class="w-full md:w-4/5">
      <el-input v-model="newRequirement" :placeholder="t('enterRequirement')" class="w-full" />
    </el-form-item>
    <div class="flex items-center justify-start md:w-1/5">
      <el-button type="primary" class="w-full" @click="addRequirement">{{ t('add') }}</el-button>
    </div>
  </div>

  <div>
    <ul>
      <li
        v-for="(requirement, index) in selectedJobPosting.requirements"
        :key="index"
        class="flex justify-between items-center py-2 border-b"
      >
        <span>{{ requirement }}</span>
        <button type="button" @click="removeRequirement(index)" class="text-red-500">
          {{ t('delete') }}
        </button>
      </li>
    </ul>
  </div>

  <el-form-item :label="t('yearsOfExperience')" prop="experienceLevel">
    <el-input-number 
      v-model="selectedJobPosting.experienceLevel" 
      :min="1" 
      :max="30" 
      class="w-full" 
    />
  </el-form-item>

  <el-form-item :label="t('area')" prop="area">
    <el-select v-model="selectedJobPosting.divisionId" class="w-full">
      <el-option
        v-for="division in divisionList"
        :key="division.id"
        :label="division.name"
        :value="division.id"
      />
    </el-select>
  </el-form-item>

  <el-form-item :label="t('modality')" prop="modality">
    <el-select v-model="selectedJobPosting.modality" class="w-full">
      <el-option :label="t('onsite')" :value="1" />
      <el-option :label="t('remote')" :value="2" />
      <el-option :label="t('hybrid')" :value="3" />
    </el-select>
  </el-form-item>

  <el-form-item :label="t('contractType')" prop="contractTypeId">
  <el-select v-model="selectedJobPosting.contractTypeId" class="w-full">
    <el-option
      v-for="contractType in contractTypeList"
      :key="contractType.id"
      :label="contractType.typeOfContract"
      :value="contractType.id"
    />
  </el-select>
</el-form-item>


  <el-form-item :label="t('priorityLevel')" prop="priority">
    <el-input-number v-model="selectedJobPosting.priority" class="w-full" />
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="updateJobPosting">{{ t('saveChanges') }}</el-button>
  </el-form-item>
</el-form>
</el-dialog>

  <!-- Paginación -->
  <el-pagination
    v-model:current-page="currentPage"
    :page-size="pageSize"
    :page-sizes="[10, 20, 50]"
    layout="total, sizes, prev, pager, next"
    :total="jobPostingStore.jobPostings.length"
    @size-change="handleSizeChange"
    @current-change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { useJobPostingStore } from "@/presentation/stores/jobPostings.store";
import { useContracTypeStore } from "@/presentation/stores/contractType.store";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";
import { useJobTitleStore } from "@/presentation/stores/jobTitle.store";
import { useDivisionStore } from "@/presentation/stores/division.store";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const formatSalary = (salary) => {
  if (!salary) return 'No especificado';
  return new Intl.NumberFormat('es-CO').format(salary);
};
const formatSalaryInput = (type) => {
  let target = type === "create" ? jobPosting : selectedJobPosting;

  let numericValue = target.value.salaryRange.replace(/\D/g, "");

  if (!numericValue) {
    target.value.salaryRange = "";
    return;
  }

  target.value.salaryRange = new Intl.NumberFormat("es-CO").format(parseInt(numericValue, 10));
};

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const jobPostingStore = useJobPostingStore();
const currentPage = ref(1);
const pageSize = ref(10);
const contractTypeList = ref<ContractType[]>([]);

const jobTitleStore = useJobTitleStore();
const jobTitleList = ref<{ id: number; name: string }[]>([]);
const isLoadingJobTitles = ref(false);

const divisionStore = useDivisionStore();
const divisionList = ref<{ id: number; name: string }[]>([]);
const isLoadingDivisions = ref(false);

const jobPosting = ref<JobPosting>({
  jobTitleId: 1,
  description: "",
  salaryRange: "",
  experienceLevel: 1,
  divisionId: 1,
  requirements: [] as string[],
  modality: 1,
  contractTypeId: 1,
  contractDuration: "",
  publicationDate: new Date().toISOString(),
  closingDate: new Date().toISOString(),
  priority: 1,
  priorityText: ""
});

const selectedJobPosting = ref<JobPosting>({
  jobTitleId: 1,
  description: "",
  salaryRange: "",
  experienceLevel: 1,
  divisionId: 1,
  requirements: [] as string[],
   modality: 1,
   contractTypeId: 1,
  contractDuration: "",
  publicationDate: new Date().toISOString(),
  closingDate: new Date().toISOString(),
  priority: 1,
  priorityText: ""
});

const showInactive = ref(false);

const submitJobPosting = async () => {
  try {
    await jobPostingStore.createJobPosting(jobPosting.value);
    await jobPostingStore.fetchJobPostingsCopy();
    isAddModalOpen.value = false;
  } catch (error) {
    console.error("Error al crear el puesto de trabajo:", error);
  }
};

const newRequirement = ref("");
const addRequirement = () => {
  if (newRequirement.value.trim() !== "") {
    const requirementText = newRequirement.value.trim();
    if (selectedJobPosting.value.requirements) {
      selectedJobPosting.value.requirements.push(requirementText);
    }
    if (jobPosting.value.requirements) {
      jobPosting.value.requirements.push(requirementText);
    }
    newRequirement.value = "";
  }
};

const removeRequirement = (index: number) => {
  if (selectedJobPosting.value.requirements && selectedJobPosting.value.requirements.length > index) {
    selectedJobPosting.value.requirements.splice(index, 1);
  }
  if (jobPosting.value.requirements && jobPosting.value.requirements.length > index) {
    jobPosting.value.requirements.splice(index, 1);
  }
};

const loadData = async () => {
  try {
    const store = useContracTypeStore();
    await store.fetchContractType(true);
    contractTypeList.value = store.contractTypeList;

    isLoadingJobTitles.value = true;
    jobTitleList.value = await jobTitleStore.fetchJobTitles(true);
    isLoadingJobTitles.value = false;

    isLoadingDivisions.value = true;
    divisionList.value = await divisionStore.fetchDivision(true);
    isLoadingDivisions.value = false;
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
};

onMounted(() => {
  jobPostingStore.fetchJobPostingsCopy();
  loadData();
});

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

const paginatedData = computed(() => {
  const filteredJobs = showInactive.value
    ? jobPostingStore.jobPostings
    : jobPostingStore.jobPostings.filter(job => job.isActive);

  const start = (currentPage.value - 1) * pageSize.value;
  return filteredJobs.slice(start, start + pageSize.value);
});

watch(showInactive, async () => {
  await jobPostingStore.fetchJobPostingsCopy(showInactive.value);
});

const handleSizeChange = (size: number) => {
  pageSize.value = size;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const originalJobPosting = ref<JobPosting | null>(null);
const openEditModal = (job: JobPosting) => {
  selectedJobPosting.value = { ...job };
  originalJobPosting.value = JSON.parse(JSON.stringify(job)); 
  isEditModalOpen.value = true;
};

const updateJobPosting = async () => {
  if (!selectedJobPosting.value || !originalJobPosting.value) return;
  if (JSON.stringify(selectedJobPosting.value) === JSON.stringify(originalJobPosting.value)) {
    return;
  }
  try {
    await jobPostingStore.updateJobPosting(selectedJobPosting.value.id, selectedJobPosting.value);
    await jobPostingStore.fetchJobPostingsCopy();
    isEditModalOpen.value = false;
  } catch (error) {
    console.error("", error);
  }
};

const deleteJobTitle = async (id: number) => {
  try {
    await jobPostingStore.deleteJobPosting(id);
    await jobPostingStore.fetchJobPostingsCopy();
  } catch (error) {
    console.error("", error);
  }
};
</script>
