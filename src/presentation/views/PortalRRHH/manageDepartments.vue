<template>
  <el-card shadow="none">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">
        Gestionar Departamentos
      </h2>
    </template>

    <el-card shadow="never" class="mb-6">
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :inline="true"
        :model="divisionForm"
      >
        <el-form-item prop="name" label="Nombre">
          <el-input
            v-model="divisionForm.name"
            placeholder="Nombre"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >Crear departamento</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="paginatedData" border class="w-full mb-4" stripe>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="isActive" label="Estado">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Editar
          </el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Desactivar
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Paginación -->
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="divisionList.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script lang="ts" setup>
import type { Division } from "@/domain/Interfaces/Division/division.interface";
import { computed, onMounted, reactive, ref } from "vue";
import { useDivisionStore } from "@/presentation/stores/division.store";
import type { FormInstance, FormRules } from "element-plus";

const { fetchDivisions, createDivisionRequest, divisionForm } =
  useDivisionStore();
const divisionList = ref<Division[]>([]);
const isLoading = ref(false);

const search = ref("");
const currentPage = ref(1);
const pageSize = ref(10); // Número de filas por página
const ruleFormRef = ref<FormInstance>();

const filterTableData = computed(() =>
  divisionList.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const rules: FormRules<Division> = reactive({
  name: [
    { required: true, message: "El nombre es obligatorio", trigger: "blur" },
    {
      pattern: /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/,
      message: "Solo se permiten letras y espacios",
      trigger: "blur",
    },
  ],
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filterTableData.value.slice(start, start + pageSize.value);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleEdit = (index: number, row: Division) => {};

const handleDelete = (index: number, row: Division) => {};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  try {
    isLoading.value = true;

    const valid = await formEl.validate();
    if (valid) {
      await createDivisionRequest();
      resetForm(ruleFormRef.value);

      setTimeout(async () => {
        await loadData();
      }, 500);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  } finally {
    isLoading.value = false;
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const loadData = async () => {
  const { loading, divisionList: divisions } = await fetchDivisions();
  isLoading.value = loading;
  divisionList.value = divisions;
};

onMounted(() => {
  loadData();
});
</script>
