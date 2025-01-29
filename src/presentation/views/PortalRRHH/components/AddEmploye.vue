<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">Primer Nombre</label>
        <input 
          type="text" 
          id="firstName" 
          v-model="employee.firstName" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="secondName" class="block text-sm font-medium text-gray-700">Segundo Nombre</label>
        <input 
          type="text" 
          id="secondName" 
          v-model="employee.secondName" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="firstSurname" class="block text-sm font-medium text-gray-700">Primer Apellido</label>
        <input 
          type="text" 
          id="firstSurname" 
          v-model="employee.firstSurname" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="secondSurname" class="block text-sm font-medium text-gray-700">Segundo Apellido</label>
        <input 
          type="text" 
          id="secondSurname" 
          v-model="employee.secondSurname" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="documentNumber" class="block text-sm font-medium text-gray-700">Número de Documento</label>
        <input 
          type="number" 
          id="documentNumber" 
          v-model="employee.documentNumber" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">Dirección</label>
        <input 
          type="text" 
          id="address" 
          v-model="employee.address" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
        <input 
          type="number" 
          id="phone" 
          v-model="employee.phone" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input 
          type="email" 
          id="email" 
          v-model="employee.email" 
          class="input" 
          required 
        />
      </div>
  
      <div>
        <label for="eps" class="block text-sm font-medium text-gray-700">EPS</label>
        <div class="flex items-center">
          <el-select 
            v-model="employee.eps" 
            class="input w-2/3" 
            placeholder="Seleccionar EPS" 
            required
          >
            <el-option label="EPS1" value="Salud Total"></el-option>
            <el-option label="EPS2" value="EPS2"></el-option>
            <el-option label="EPS3" value="EPS3"></el-option>
          </el-select>
          <Add2 @click="addNewEPS" class="ml-2 cursor-pointer" />

          <input 
            type="number" 
            id="epsValue" 
            v-model="employee.epsValue" 
            placeholder="Valor EPS" 
            class="input w-1/3 ml-2" 
            required 
          />
        </div>
      </div>
  
      <div>
        <label for="arl" class="block text-sm font-medium text-gray-700">ARL</label>
        <div class="flex items-center">
          <el-select 
            v-model="employee.arl" 
            class="input w-2/3" 
            placeholder="Seleccionar ARL" 
            required
          >
            <el-option label="ARL1" value="ARL1"></el-option>
            <el-option label="ARL2" value="ARL2"></el-option>
            <el-option label="ARL3" value="ARL3"></el-option>
          </el-select>
          <Add2 @click="addNewARL" class="ml-2 cursor-pointer" />
          <input 
            type="number" 
            id="arlValue" 
            v-model="employee.arlValue" 
            placeholder="Valor ARL" 
            class="input w-1/3 ml-2" 
            required
          />
        </div>
      </div>
    <div>
      <label for="benefits" class="block text-sm font-medium text-gray-700">Beneficios</label>
      
      <div class="flex items-center mb-2">
        <el-select 
          v-model="newBenefit.name" 
          class="input w-2/3" 
          placeholder="Seleccionar beneficio"
        >
          <el-option label="Beneficio 1" value="Beneficio 1"></el-option>
          <el-option label="Beneficio 2" value=" Beneficio 2"></el-option>
          <el-option label="Beneficio 3" value=" Beneficio 3"></el-option>
        </el-select>

        <input 
          type="number" 
          v-model="newBenefit.value" 
          placeholder="Valor del beneficio" 
          class="input w-1/3 ml-2"
        />

        <button 
          type="button" 
          @click="addBenefit" 
          class="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Agregar
        </button>
      </div>

      <ul>
        <li 
          v-for="(benefit, index) in employee.benefits" 
          :key="index" 
          class="flex justify-between items-center py-2"
        >
          <span>{{ benefit.name }} - {{ benefit.value }}</span>
          <button 
            type="button" 
            @click="removeBenefit(index)" 
            class="text-red-500"
          >
            Eliminar
          </button>
        </li>
      </ul>
    </div>

    <div>
        <label for="contractType" class="block text-sm font-medium text-gray-700">Tipo de Contrato</label>
        <select 
          id="contractType" 
          v-model="employee.contractType" 
          class="input" 
          required
        >
          <option value="">Seleccionar tipo de contrato</option>
          <option value="Fixed">Término fijo</option>
          <option value="Indefinite">Indefinido</option>
        </select>
      </div>
  
      <div>
        <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
        <input 
          type="date" 
          id="startDate" 
          v-model="employee.startDate" 
          class="input" 
          required 
        />
      </div>
  
      <div v-if="employee.contractType === 'Fixed'">
        <label for="endDate" class="block text-sm font-medium text-gray-700">Fecha Final</label>
        <input 
          type="date" 
          id="endDate" 
          v-model="employee.endDate" 
          class="input" 
          required 
        />
      </div>
  
      <div class="flex justify-between">
        <button
          type="button"
          @click="closeForm"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Guardar
        </button>
      </div>
    </form>
  </template>

<script>
import Add2 from './Add2.vue'; 
import { ElSelect, ElOption } from 'element-plus';

export default {
  components: {
    Add2,
    ElSelect,
    ElOption,
  },
  data() {
    return {
      employee: {
        firstName: '',
        secondName: '',
        firstSurname: '',
        secondSurname: '',
        documentNumber: '',
        address: '',
        phone: '',
        email: '',
        eps: '',
        epsValue: '',
        arl: '',
        arlValue: '',
        benefits: [],  
        contractType: '',
        startDate: '',
        endDate: '',
      },
      newBenefit: {
        name: '',
        value: '',
      }
    };
  },

  methods: {
  submitForm() {
    console.log(this.employee);
  },
  closeForm() {},
  addBenefit() {
    if (this.newBenefit.name && this.newBenefit.value) {
      this.employee.benefits.push({
        name: this.newBenefit.name,
        value: this.newBenefit.value
      });
      this.newBenefit.name = ''; 
      this.newBenefit.value = ''; 
    } else {
      alert('Por favor, complete el beneficio y su valor.');
    }
  },
  removeBenefit(index) {
    this.employee.benefits.splice(index, 1); 
  },
  addNewEPS() {
    const newEPS = prompt("Ingrese el nombre de la nueva EPS:");
    if (newEPS) {
      this.employee.eps = newEPS;
    }
  },
  addNewARL() {
    const newARL = prompt("Ingrese el nombre de la nueva ARL:");
    if (newARL) {
      this.employee.arl = newARL;
    }
  }
}
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

  
  