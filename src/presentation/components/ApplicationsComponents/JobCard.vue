<template>
  <AddApplicancy
    v-model:dialog="isAddModalOpen"
    @employee-saved="handleEmployeeSaved"
    :idJobPosting="jobPostingId"
  />

  <!-- Grid de tarjetas con paginación -->
  <div class="job-list">
    <el-card
      v-for="job in paginatedJobs"
      :key="job.id"
      class="job-card"
    >
      <!-- Header de la tarjeta -->
      <template #header>
        <div class="card-header flex justify-between">
          <span class="font-semibold">{{ job.jobTitleName }}</span>
        </div>
      </template>

      <!-- Contenido de la tarjeta -->
      <div class="card-content text-sm text-gray-600">
        <p><strong>{{ t('salario') }}:</strong> {{ formatSalary(job.salaryRange) }}</p>

        <p><strong>{{ t('descripcion') }}:</strong></p>
        <p v-if="job.description.length <= 100">{{ job.description }}</p>
        <p v-else>
          {{ expandedDescriptions[job.id] ? job.description : job.description.slice(0, 100) + '...' }}
          <el-button text @click="toggleDescription(job.id)">
            {{ expandedDescriptions[job.id] ? t('verMenos') : t('verMas') }}
          </el-button>
        </p>

        <p><strong>{{ t('requerimientos') }}:</strong></p>
        <ul>
          <li v-for="(requirement, index) in job.requirements" :key="index">
            - {{ requirement }}
          </li>
        </ul>
      </div>

      <!-- Footer de la tarjeta -->
      <template #footer>
        <el-button type="primary" @click="openAddModal(job.id)">
          {{ t('aplicarAhora') }}
        </el-button>
      </template>
    </el-card>
  </div>

  <!-- Paginación -->
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="jobStore.jobPostings.length"
      @current-change="handlePageChange"
    />
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
const pageSize = ref(6); // Valor inicial para pantallas grandes

// Formato del salario
const formatSalary = (salary: string | number) => {
  if (!salary) return 'No especificado';
  return new Intl.NumberFormat('es-CO').format(Number(salary));
};

// Computed para manejar la paginación
const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return jobStore.jobPostings.slice(start, start + pageSize.value);
});

// Función para manejar la paginación
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// Ajustar `pageSize` según el tamaño de la pantalla
const updatePageSize = () => {
  if (window.innerWidth < 800) {
    pageSize.value = 1; // Solo 2 tarjetas en móviles
  } else {
    pageSize.value = 6; // 6 tarjetas en pantallas grandes
  }
};

// Escuchar cambios en el tamaño de la pantalla
onMounted(() => {
  updatePageSize();
  window.addEventListener("resize", updatePageSize);
  
  if (!jobStore.jobPostings.length) {
    jobStore.fetchJobPostingsCopy();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updatePageSize);
});

// Modal de aplicación
const openAddModal = (idJobPosting: number) => {
  jobPostingId.value = idJobPosting;
  isAddModalOpen.value = true;
};

// Expande o colapsa la descripción
const toggleDescription = (id: number) => {
  expandedDescriptions[id] = !expandedDescriptions[id];
};

const handleEmployeeSaved = () => {
  isAddModalOpen.value = false;
};
</script>


<style>
/* Contenedor del grid */
.job-list {
  display: grid;
  gap: 30px;
  justify-content: center;
  padding: 20px;
}

/* Cuando la pantalla sea mayor a 800px, se mostrarán 6 tarjetas */
@media (min-width: 800px) {
  .job-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .job-list {
    grid-template-columns: repeat(6, 1fr);
  }
}

/* Estilos para las tarjetas */
.job-card {
  max-width: 400px;
  height: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  padding: 15px;
}

/* Contenedor de la paginación */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
