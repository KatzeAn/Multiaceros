<template>
  <div class="layout flex">
    <div class="sidebar p-4 space-y-6 bg-gray-50 border-r">
      <div class="logo">
        <img src="../../assets/Logo 1-.png" alt="logo" class="w-16 h-16">
      </div>
      <div class="filter-section">
        <p>Filtrar por:</p>
        <label for="category" class="block text-sm font-medium">Vacantes</label>
        <el-select v-model="category" class="w-full" placeholder="Selecciona una vacante">
          <el-option label="Diseñador Frontend" value="Diseñador Frontend"></el-option>
          <el-option label="Diseñador Backend" value="Diseñador Backend"></el-option>
          <el-option label="Desarrollador Fullstack" value="Desarrollador Fullstack"></el-option>
          <el-option label="Desarrollador de inteligencia artificial" value="Desarrollador de inteligencia artificial"></el-option>
          <el-option label="Diseñador UX/UI" value="Diseñador UX/UI"></el-option>
          <el-option label="Gerente de proyectos" value="Gerente de proyectos"></el-option>
        </el-select>
      </div>

      <div class="location-section">
        <label for="location" class="block text-sm font-medium">Ubicación</label>
        <el-select v-model="location" class="w-full" placeholder="Selecciona una ubicación">
          <el-option label="Remoto" value="remote"></el-option>
          <el-option label="Presencial" value="on-site"></el-option>
        </el-select>
      </div>

      <div class="salary-section">
        <label for="salary" class="block text-sm font-medium">Salario</label>
        <input
          id="salary"
          type="number"
          v-model="salary"
          class="w-full text-center border text-black border-gray-300 rounded"
          min="100000"
          step="100000"
        />
      </div>

      <div class="job-type-section">
        <label class="block text-sm font-medium">Tipo de trabajo</label>
        <div class="flex flex-col space-y-2">
          <el-radio-group v-model="jobType">
            <el-radio label="full-time">Jornada completa</el-radio>
            <el-radio label="part-time">Tiempo parcial</el-radio>
          </el-radio-group>
        </div>
        <div class="flex space-x-4">
          <button 
            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition" 
            @click="applyFilters">
            Aplicar filtros
          </button>
          <button 
            class="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition" 
            @click="clearFilters">
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElSelect, ElOption, ElRadioGroup, ElRadio } from 'element-plus'

const category = ref('')
const location = ref('')
const salary = ref(100000) 
const jobType = ref('full-time')

const applyFilters = () => {
  console.log('Filtros aplicados:')
  console.log('Categoría:', category.value)
  console.log('Ubicación:', location.value)
  console.log('Salario:', salary.value)
  console.log('Tipo de trabajo:', jobType.value)
}

const clearFilters = () => {
  category.value = ''
  location.value = ''
  salary.value = 100000
  jobType.value = 'full-time'
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 100%;
  max-width: 16rem;
  height: 100vh;
  background-color: var(--secondary-alt-color);
  color: var(--light-color);
  padding-top: 1rem;
  border-right: 3px solid var(--gray-color); 
}

input[type="number"] {
  -moz-appearance: textfield;
}

.text-sm {
  font-size: 0.875rem;
}

.space-y-6 > * + * {
  margin-top: 5px;
}

.filter-section,
.location-section,
.salary-section,
.job-type-section {
  margin-bottom: 1.5rem;
}

::v-deep .el-radio__label {
  color: white; 
}
</style>
