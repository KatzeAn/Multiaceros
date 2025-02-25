<template>
    <el-dialog v-model="isOpen" title="Gestionar Notificaciones" width="40%" @close="closeModal">
      <div class="space-y-4">
        <el-input v-model="newNotification" placeholder="Escribe una nueva notificación..." clearable />
        <el-button type="primary" @click="addNotification">Agregar Notificación</el-button>
        <el-divider />
        <el-list>
          <el-list-item v-for="(notification, index) in notifications" :key="index">
            <div class="flex justify-between items-center w-full">
              <span>{{ notification }}</span>
              <el-button type="danger" size="small" @click="removeNotification(index)">Eliminar</el-button>
            </div>
          </el-list-item>
        </el-list>
      </div>
      <template #footer>
        <el-button @click="closeModal">Cerrar</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const isOpen = ref(false);
  const newNotification = ref("");
  const notifications = ref([]);
  
  const openModal = () => {
    isOpen.value = true;
  };
  
  const closeModal = () => {
    isOpen.value = false;
  };
  
  const addNotification = () => {
    if (newNotification.value.trim() !== "") {
      notifications.value.push(newNotification.value);
      newNotification.value = "";
    }
  };
  
  const removeNotification = (index) => {
    notifications.value.splice(index, 1);
  };
  
  defineExpose({ openModal });
  </script>
  
  <style scoped>
  .el-list {
    max-height: 200px;
    overflow-y: auto;
  }
  </style>
  