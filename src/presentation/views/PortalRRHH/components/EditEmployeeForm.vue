<template>
    <form @submit.prevent="submitForm">
      <div class="space-y-4">
        <el-input v-model="localEmployee.fullName" placeholder="Nombre completo" />
        <el-input v-model="localEmployee.position" placeholder="Posición" />
        <el-date-picker v-model="localEmployee.hireDate" placeholder="Fecha de contratación" />
        <el-select v-model="localEmployee.status" placeholder="Estado">
          <el-option label="Activo" value="Activo" />
          <el-option label="Inactivo" value="Inactivo" />
          <el-option label="En periodo de prueba" value="En periodo de prueba" />
        </el-select>
      </div>
      <div class="mt-4 flex justify-end space-x-2">
        <el-button type="default" @click="$emit('close')">Cancelar</el-button>
        <el-button type="primary" native-type="submit">Guardar</el-button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      employee: Object,
    },
    data() {
      return {
        localEmployee: { ...this.employee },
      };
    },
    methods: {
      submitForm() {
        this.$emit("save", this.localEmployee);
      },
    },
  };
  </script>
  