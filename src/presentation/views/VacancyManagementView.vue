<template>
  <el-button type="primary" icon="Plus" @click="isAddModalOpen = true">
    Agregar Puesto de Trabajo
  </el-button>

  <el-dialog v-model="isAddModalOpen" title="Añadir Nuevo Puesto de Trabajo">
    <el-form ref="formRef" :model="jobPosting">
      <el-form-item label="Título" prop="title">
        <el-input v-model="jobPosting.title" />
      </el-form-item>

      <el-form-item label="Descripción" prop="description">
        <el-input v-model="jobPosting.description" type="textarea" />
      </el-form-item>

      <el-form-item label="Rango Salarial" prop="salaryRange">
        <el-input v-model="jobPosting.salaryRange" />
      </el-form-item>

      <el-form-item label="Nivel de Experiencia" prop="experienceLevel">
        <el-input-number v-model="jobPosting.experienceLevel" :min="1" />
      </el-form-item>

      <el-form-item label="Área" prop="area">
        <el-input v-model="jobPosting.area" />
      </el-form-item>

      <el-form-item label="Modalidad" prop="modality">
        <el-select v-model="jobPosting.modality">
          <el-option label="Presencial" :value="1" />
          <el-option label="Remoto" :value="2" />
          <el-option label="Híbrido" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="Tipo de Contrato" prop="contractType">
        <el-select v-model="jobPosting.contractType">
          <el-option
            v-for="contractType in contractTypeList"
            :key="contractType.id"
            :label="contractType.typeOfContract"
            :value="contractType.id"
          />
        </el-select>
        <el-form-item label="Nivel de Prioridad" prop="priority">
  <el-input-number v-model="jobPosting.priority" :min="1" />
</el-form-item>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitJobPosting">Confirmar</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- Tabla de Puestos de Trabajo -->
  <el-checkbox v-model="showInactive" class="ml-4">Mostrar Inactivos</el-checkbox>
<el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
  <el-table-column label="Nombre del Puesto" prop="title" />
  <el-table-column label="Área" prop="area" />
  <el-table-column label="Salario" prop="salaryRange" />
  <el-table-column label="Tipo de Contrato">
    <template #default="{ row }">
      {{ getContractType(row.contractType) }}
    </template>
  </el-table-column>
  <el-table-column label="Nivel de Prioridad" prop="priorityText" />
  <el-table-column prop="isActive" label="Estado">
    <template #default="{ row }">
      <el-tag :type="row.isActive ? 'success' : 'danger'">
        {{ row.isActive ? "Activo" : "Inactivo" }}
      </el-tag>
    </template>
  </el-table-column>
  <el-table-column label="Acciones">
  <template #default="scope">
    <div class="flex space-x-2">
      <el-button size="small" @click="openEditModal(scope.row)">Editar</el-button>
      <el-button :loading="isLoading" size="small" type="danger" :disabled="!scope.row.isActive" @click="deleteJobTitle(scope.row.id)">
        Desactivar
      </el-button>
    </div>
  </template>
</el-table-column>

</el-table>


  <!-- Modal para editar puesto -->
  <el-dialog v-model="isEditModalOpen" title="Editar Puesto de Trabajo">
  <el-form ref="editFormRef" :model="selectedJobPosting">
    <el-form-item label="Título" prop="title">
      <el-input v-model="selectedJobPosting.title" />
    </el-form-item>

    <el-form-item label="Descripción" prop="description">
      <el-input v-model="selectedJobPosting.description" type="textarea" />
    </el-form-item>

    <el-form-item label="Rango Salarial" prop="salaryRange">
      <el-input v-model="selectedJobPosting.salaryRange" />
    </el-form-item>

    <el-form-item label="Nivel de Experiencia" prop="experienceLevel">
      <el-input-number v-model="selectedJobPosting.experienceLevel" :min="1" />
    </el-form-item>

    <el-form-item label="Área" prop="area">
      <el-input v-model="selectedJobPosting.area" />
    </el-form-item>

    <el-form-item label="Modalidad" prop="modality">
      <el-select v-model="selectedJobPosting.modality">
        <el-option label="Presencial" :value="1" />
        <el-option label="Remoto" :value="2" />
        <el-option label="Híbrido" :value="3" />
      </el-select>
    </el-form-item>

    <el-form-item label="Tipo de Contrato" prop="contractType">
      <el-select v-model="selectedJobPosting.contractType">
        <el-option
          v-for="contractType in contractTypeList"
          :key="contractType.id"
          :label="contractType.typeOfContract"
          :value="contractType.id"
        />
      </el-select>
    </el-form-item>
<el-form-item label="Nivel de Prioridad" prop="priority">
  <el-input-number v-model="selectedJobPosting.priorityText" />
</el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateJobPosting">Guardar Cambios</el-button>
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
import { ref, computed, onMounted } from "vue";
import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface";
import { useJobPostingStore } from "@/presentation/stores/jobPostings.store";
import { useContracTypeStore } from "@/presentation/stores/contractType.store";
import type { ContractType } from "@/domain/Interfaces/Contract/contractType.interface";

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const jobPostingStore = useJobPostingStore();
const currentPage = ref(1);
const pageSize = ref(10);
const contractTypeList = ref<ContractType[]>([]);

const jobPosting = ref<JobPosting>({
  title: "",
  description: "",
  salaryRange: "",
  experienceLevel: 1,
  area: "",
  requirements: [],
  modality: 1,
  contractType: 1,
  contractDuration: "",
  publicationDate: new Date().toISOString(),
  closingDate: new Date().toISOString(),
  priority: 1,
  priorityText: ""
});

const selectedJobPosting = ref<JobPosting>({
  title: "",
  description: "",
  salaryRange: "",
  experienceLevel: 1,
  area: "",
  requirements: [],
  modality: 1,
  contractType: 1,
  contractDuration: "",
  publicationDate: new Date().toISOString(),
  closingDate: new Date().toISOString(),
  priority: 1,
  priorityText: ""
});

const submitJobPosting = async () => {
  try {
    await jobPostingStore.createJobPosting(jobPosting.value);
    await jobPostingStore.fetchJobPostings();
    isAddModalOpen.value = false;
  } catch (error) {
    console.error("Error al crear el puesto de trabajo:", error);
  }
};

const loadData = async () => {
  try {
    const store = useContracTypeStore();
    await store.fetchContractType();
    console.log("Datos de contrato recibidos:", store.contractTypeList);
    contractTypeList.value = store.contractTypeList;
  } catch (error) {
    console.error("Error cargando los tipos de contrato:", error);
  }
};


onMounted(() => {
  jobPostingStore.fetchJobPostings();
  loadData();
});

const getContractType = (contractTypeId: number) => {
  const contractType = contractTypeList.value.find((type) => type.id === contractTypeId);
  return contractType ? contractType.typeOfContract : "Desconocido";
};

const paginatedData = computed(() => {
  const filteredJobs = showInactive.value
    ? jobPostingStore.jobPostings
    : jobPostingStore.jobPostings.filter(job => job.isActive);

  const start = (currentPage.value - 1) * pageSize.value;
  return filteredJobs.slice(start, start + pageSize.value);
});

const showInactive = ref(false);


const handleSizeChange = (size: number) => {
  pageSize.value = size;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const openEditModal = (job: JobPosting) => {
  selectedJobPosting.value = { ...job };
  isEditModalOpen.value = true;
};

const updateJobPosting = async () => {
  if (!selectedJobPosting.value) return;
  try {
    await jobPostingStore.updateJobPosting(selectedJobPosting.value.id, selectedJobPosting.value);
    await jobPostingStore.fetchJobPostings();
    isEditModalOpen.value = false;
  } catch (error) {
    console.error("Error al actualizar el puesto de trabajo:", error);
  }
};

const deleteJobTitle = async (id: number) => {
  try {
    await jobPostingStore.deleteJobPosting(id);
    await jobPostingStore.fetchJobPostings();
  } catch (error) {
    console.error("Error al eliminar el puesto de trabajo:", error);
  }
};
</script>