<template>
  <addEmployeePotential
    v-model:dialog="isAddModalOpen"
    @employee-saved="handleEmployeeSaved"
  />

  <el-card shadow="never">
    <template #header>
      <div class="flex flex-wrap justify-between">
        <h2 class="text-xl text-gray-700 font-semibold">
          {{ t('allCandidates') }}
        </h2>
        <el-button type="primary" icon="Plus" @click="openAddModal">
          {{ t('referCandidate') }}
        </el-button>
      </div>
    </template>

    <el-table
      :data="paginatedData"
      border
      class="w-full min-h-96 mb-4"
      stripe
      @row-click="handleRowClick"
      row-class-name="cursor-pointer"
    >
      <el-table-column :label="t('name')">
        <template #default="{ row }">
          {{ `${row.firstName} ${row.surName}` }}
        </template>
      </el-table-column>
      <el-table-column prop="jobPostingTitle" :label="t('appliedJob')" width="150" />
      <el-table-column prop="email" :label="t('email')" width="150" />
      <el-table-column prop="cellPhone" :label="t('cellphone')" width="150" />
      <el-table-column :label="t('actions')" width="150">
        <template #default="scope">
          <div class="flex flex-wrap items-center gap-2">
            <el-button size="small" @click="handleRowClick">
              {{ t('details') }}
            </el-button>
            <el-button disabled size="small" type="danger">
              {{ t('deactivate') }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="employeePotentialList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>

  <!-- Pasamos el número de documento como prop -->
  <DetailPotentialEmployee
    v-model:drawer="drawer"
    :handleClose="handleClose"
    :documentNumber="selectedDocumentNumber"
  />
</template>

<script lang="ts" setup>
import { EmployeePotentialStatusEnum } from "@/presentation/common/enum/employeePotentialStatus";
import DetailPotentialEmployee from "@/presentation/components/employeePotential/detailPotentialEmployee.vue";
import addEmployeePotential from "@/presentation/components/employeePotential/addEmployeePotential.vue";
import { useEmployeePotentialViewModel } from "@/presentation/viewmodels/employeePotentialViewModel";
import { ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const openAddModal = () => {
  isAddModalOpen.value = true;
};

const {
  employeePotentialList,
  currentPage,
  pageSize,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  loadEmployeePotential,
} = useEmployeePotentialViewModel();

const drawer = ref(false);
const isAddModalOpen = ref(false);
const selectedDocumentNumber = ref<number | null>(null);

const handleRowClick = (row: any) => {
  selectedDocumentNumber.value = row.numberDocument;
  drawer.value = true;
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("¿Estás seguro de cerrar la ventana?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const handleEmployeeSaved = () => {
  loadEmployeePotential();
  isAddModalOpen.value = false;
};

onMounted(async () => {
  await loadEmployeePotential();
});
</script>
