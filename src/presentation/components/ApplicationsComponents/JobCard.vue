<template>
    <el-card class="job-card" style="max-width: 480px; margin: 20px;">
      <template #header>
        <div class="card-header flex justify-between">
          <span class="font-semibold">{{ jobTitle }}</span>
        </div>
      </template>
      <div class="card-content text-sm text-gray-600">
        <p><strong>Nombre de la empresa:</strong> {{ companyName }}</p>
        <p><strong>Ubicación:</strong> {{ location }}</p>
        <p><strong>Tipo de empleo:</strong> {{ jobType }}</p>
        <p><strong>Descripción:</strong> {{ description }}</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="openForm">Aplicar ahora</el-button>
      </template>
  
      <el-dialog
        v-model="formVisible"
        title="Formulario de Aplicación"
        width="50%"
        @close="resetForm"
      >
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Documento
            </label>
            <el-select v-model="form.documentType" placeholder="Seleccione">
              <el-option label="Cédula de Ciudadanía" :value="1" />
              <el-option label="tarjeta de identidad" :value="2" />
            </el-select>
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Número de Documento
            </label>
            <el-input
              v-model="form.numberDocument"
              placeholder="Ingrese su número de documento"
              maxlength="15"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            />
          </div>
  
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Primer Nombre
              </label>
              <el-input
                v-model="form.firstName"
                placeholder="Ingrese su primer nombre"
                maxlength="30"
                oninput="this.value = this.value.replace(/[^a-zA-Z ]/g, '')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Segundo Nombre
              </label>
              <el-input
                v-model="form.middleName"
                placeholder="Ingrese su segundo nombre"
                maxlength="30"
                oninput="this.value = this.value.replace(/[^a-zA-Z ]/g, '')"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Apellido
              </label>
              <el-input
                v-model="form.surName"
                placeholder="Ingrese su apellido"
                maxlength="30"
                oninput="this.value = this.value.replace(/[^a-zA-Z ]/g, '')"
              />
            </div>
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Nacimiento
            </label>
            <el-date-picker
              v-model="form.dateOfBirth"
              type="date"
              placeholder="Seleccione su fecha de nacimiento"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <el-input
              v-model="form.email"
              type="email"
              placeholder="Ingrese su email"
            />
          </div>
  
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <el-input
              v-model="form.cellPhone"
              placeholder="Ingrese su número de teléfono"
              maxlength="15"
              oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            />
          </div>
  
          <div class="text-right">
            <el-button @click="formVisible = false">Cancelar</el-button>
            <el-button type="primary" native-type="submit">Enviar</el-button>
          </div>
        </form>
      </el-dialog>
    </el-card>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'JobCard',
    props: {
      jobTitle: { type: String, required: true },
      companyName: { type: String, required: true },
      location: { type: String, required: true },
      jobType: { type: String, required: true },
      description: { type: String, required: true },
    },
    data() {
      return {
        formVisible: false,
        form: {
          documentType: null,
          numberDocument: '',
          firstName: '',
          middleName: '',
          surName: '',
          dateOfBirth: '',
          email: '',
          cellPhone: '',
          resume: null,
        },
      };
    },
    methods: {
      openForm() {
        this.formVisible = true;
      },
      resetForm() {
        this.form = {
          documentType: null,
          numberDocument: '',
          firstName: '',
          middleName: '',
          surName: '',
          dateOfBirth: '',
          email: '',
          cellPhone: '',
          resume: null,
        };
      },
      handleFileExceed() {
        this.$message.error('Solo se permite subir un archivo.');
      },
      submitForm() {
        console.log('Formulario enviado:', this.form);
        // enviar la solicitud al endpoint 
      },
    },
  });
  </script>
  
  <style scoped>
  .job-card {
    background-color: #f9fafb;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
    