<template>
  <div class="p-6">
    <el-form :model="applicationForm" ref="applicationFormRef" label-width="160px" class="space-y-6">
        <el-form-item label="Nombre de la Vacante" :rules="[{ required: true, message: 'Por favor ingrese el nombre de la vacante', trigger: 'blur' }]">
        <el-input v-model="applicationForm.title" placeholder="Ingrese el nombre de la vacante" class="w-full"></el-input>
      </el-form-item>

      <el-form-item label="Descripción" :rules="[{ required: true, message: 'Por favor ingrese una descripción', trigger: 'blur' }]">
        <el-input type="textarea" v-model="applicationForm.description" placeholder="Describa brevemente la vacante" rows="4" class="w-full"></el-input>
      </el-form-item>

      <el-form-item label="Rango Salarial" :rules="[{ required: true, message: 'Por favor ingrese un rango salarial', trigger: 'blur' }]">
        <el-input v-model="applicationForm.salaryRange" placeholder="Ejemplo: $50,000 - $70,000" class="w-full"></el-input>
      </el-form-item>

      <el-form-item label="Nivel de Experiencia" :rules="[{ required: true, message: 'Por favor seleccione el nivel de experiencia', trigger: 'blur' }]">
        <el-select v-model="applicationForm.experienceLevel" placeholder="Seleccione nivel de experiencia" class="w-full">
          <el-option label="Junior" value="1"></el-option>
          <el-option label="SemiSenior" value="2"></el-option>
          <el-option label="Senior" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Área" :rules="[{ required: false }]">
        <el-input v-model="applicationForm.area" placeholder="Ingrese el área (opcional)" class="w-full"></el-input>
      </el-form-item>

      <el-form-item label="Requisitos" :rules="[{ required: true, message: 'Por favor ingrese los requisitos', trigger: 'blur' }]">
        <el-input type="textarea" v-model="applicationForm.requirements" placeholder="Escriba los requisitos para la vacante" rows="4" class="w-full"></el-input>
      </el-form-item>

      <el-form-item label="Modalidad" :rules="[{ required: true, message: 'Por favor seleccione la modalidad', trigger: 'blur' }]">
        <el-select v-model="applicationForm.modality" placeholder="Seleccione modalidad de trabajo" class="w-full">
          <el-option label="Presencial" value="1"></el-option>
          <el-option label="Remoto" value="2"></el-option>
          <el-option label="Híbrido" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Tipo de Contrato" :rules="[{ required: true, message: 'Por favor seleccione el tipo de contrato', trigger: 'blur' }]">
        <el-select v-model="applicationForm.contractType" placeholder="Seleccione el tipo de contrato" class="w-full">
          <el-option label="Contrato de Trabajo" value="1"></el-option>
          <el-option label="Contrato Freelance" value="2"></el-option>
          <el-option label="Contrato de Obra o Labor" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Duración del Contrato" :rules="[{ required: true, message: 'Por favor ingrese la duración del contrato', trigger: 'blur' }]">
        <el-input v-model="applicationForm.contractDuration" placeholder="ingrese la duracion del contrato" class="w-full"></el-input>
      </el-form-item>

      <el-form-item label="Fecha de Publicación" :rules="[{ required: true, message: 'Por favor ingrese la fecha de publicación', trigger: 'blur' }]">
        <el-date-picker v-model="applicationForm.publicationDate" type="datetime" placeholder="Seleccione la fecha de publicación" class="w-full"></el-date-picker>
      </el-form-item>

      <el-form-item label="Fecha de Cierre" :rules="[{ required: true, message: 'Por favor ingrese la fecha de cierre', trigger: 'blur' }]">
        <el-date-picker v-model="applicationForm.closingDate" type="datetime" placeholder="Seleccione la fecha de cierre" class="w-full"></el-date-picker>
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