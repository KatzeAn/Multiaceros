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

        <el-form-item label="Requerimientos" prop="requerimientos">
          <el-input v-model="jobPosting.requirements" />
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
            <el-option label="Indefinido" :value="1" />
            <el-option label="Término fijo" :value="2" />
            <el-option label="Freelance" :value="3" />
          </el-select>
        </el-form-item>
  
        <el-form-item label="Duración del Contrato" prop="contractDuration">
          <el-input v-model="jobPosting.contractDuration" />
        </el-form-item>
  
        <el-form-item label="Fecha de Publicación" prop="publicationDate">
          <el-date-picker v-model="jobPosting.publicationDate" type="date" />
        </el-form-item>
  
        <el-form-item label="Fecha de Cierre" prop="closingDate">
          <el-date-picker v-model="jobPosting.closingDate" type="date" />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="submitJobPosting">Confirmar</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import type { JobPosting } from "@/domain/Interfaces/jobPostings/jobPostings.interface"; 
  import { useJobPostingStore } from "@/presentation/stores/jobPostings.store"; 
  
  const isAddModalOpen = ref(false);
  const jobPostingStore = useJobPostingStore();
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
  });
  
  const submitJobPosting = async () => {
    console.log("Enviando:", jobPosting.value);
  
    try {
      await jobPostingStore.createJobPosting(jobPosting.value);
      isAddModalOpen.value = false;
    } catch (error) {
      console.error("Error al crear el puesto de trabajo:", error);
    }
  };
  </script>
  