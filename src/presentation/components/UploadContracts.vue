<template>
    <div>
        <h2 class="text-lg font-semibold mb-4">Empleados</h2>
      <el-input v-model="searchQuery" placeholder="Buscar empleado..." clearable class="mb-4" />
      
      <el-table :data="filteredData" border class="w-full min-h-96 mb-4" stripe>
        <el-table-column label="Nombre" prop="fullName" width="150"/>
        <el-table-column label="Correo Electrónico" prop="email" align="center"  width="150"/>
        <el-table-column label="Cargo" prop="jobTitle" align="center" width="150"/>
        <el-table-column label="Departamento" prop="division" align="center" width="150" />
  
        <el-table-column prop="isActive" label="Estado" align="center">
          <template #default="{ row }">
            <el-tag :type="row.isActive ? 'success' : 'danger'">
              {{ row.isActive ? "Activo" : "Inactivo" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Acciones" align="center" width="150">
          <template #default="scope">
            <el-button size="small" @click="openUploadModal">
              Subir contrato
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    
      <el-dialog v-model="isUploadModalOpen">
        <UploadContractModal />
      </el-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref, computed } from "vue";
  import { useEmployeeViewModel } from "@/presentation/viewmodels/employeeViewModel";
  import UploadContractModal from "@/presentation/components/UploadContractModal.vue";
  
  const { paginatedData, loadEmployee } = useEmployeeViewModel();
  const isUploadModalOpen = ref(false);
  const searchQuery = ref("");
  
  const openUploadModal = () => {
    isUploadModalOpen.value = true;
  };
  
  const filteredData = computed(() => {
    if (!searchQuery.value) return paginatedData.value;
    const query = searchQuery.value.toLowerCase();
    return paginatedData.value.filter(employee =>
      employee.fullName.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query)
    );
  });
  
  onMounted(() => {
    loadEmployee();
  });
  </script>