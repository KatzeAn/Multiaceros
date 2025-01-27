<template>
    <div class="p-6">
      <el-form :model="applicationForm" ref="applicationFormRef" label-width="160px" class="space-y-6">
        <el-form-item label="Nombre de la Vacante" :rules="[{ required: true, message: 'Por favor ingrese el nombre de la vacante', trigger: 'blur' }]">
          <el-input v-model="applicationForm.jobTitle" placeholder="Ingrese el nombre de la vacante" class="w-full"></el-input>
        </el-form-item>
  

        
        <el-form-item label="Empresa" :rules="[{ required: true, message: 'Por favor ingrese el nombre de la empresa', trigger: 'blur' }]">
          <el-input v-model="applicationForm.companyName" placeholder="Nombre de la empresa" class="w-full"></el-input>
        </el-form-item>
  
        <el-form-item label="Ubicación" :rules="[{ required: true, message: 'Por favor seleccione la ubicación', trigger: 'blur' }]">
          <el-select v-model="applicationForm.location" placeholder="Seleccione ubicación" class="w-full">
            <el-option label="Remoto" value="remote"></el-option>
            <el-option label="Presencial" value="on-site"></el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="Tipo de Empleo" :rules="[{ required: true, message: 'Por favor seleccione el tipo de empleo', trigger: 'blur' }]">
          <el-select v-model="applicationForm.jobType" placeholder="Seleccione tipo de empleo" class="w-full">
            <el-option label="Jornada Completa" value="full-time"></el-option>
            <el-option label="Tiempo Parcial" value="part-time"></el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="Descripción" :rules="[{ required: true, message: 'Por favor ingrese una descripción', trigger: 'blur' }]">
          <el-input type="textarea" v-model="applicationForm.description" placeholder="Describa brevemente la vacante" rows="4" class="w-full"></el-input>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="submitApplication">Crear Postulación</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        applicationForm: {
          jobTitle: '',
          companyName: '',
          location: '',
          jobType: '',
          description: '',
        },
      };
    },
    methods: {
      submitApplication() {
        this.$refs.applicationFormRef.validate((valid) => {
          if (valid) {
            //enviar los datos al back
            console.log('Postulación creada', this.applicationForm);
            this.resetForm();
          } else {
            console.log('Formulario no válido');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.applicationFormRef.resetFields();
      },
    },
  };
  </script>