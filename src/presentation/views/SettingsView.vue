<template>
  <el-card shadow="never">
    <template #header>
      <h2 class="text-xl text-gray-700 font-semibold">Configuración de Notificaciones</h2>
      <el-checkbox v-model="showInactive" class="mt-2">Mostrar Inactivos</el-checkbox>
    </template>

    <el-table :data="paginatedData" border class="w-full min-h-96 mb-4" stripe>
      <el-table-column prop="name" label="Nombre" />
      <el-table-column prop="description" label="Descripción" align="center" />
      <el-table-column prop="daysBefore" label="Días Antes" align="center" />
      <el-table-column prop="isActive" label="Estado" align="center">
        <template #default="{ row }">
          <el-tag :type="row.isActive ? 'success' : 'danger'">
            {{ row.isActive ? "Activo" : "Inactivo" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones" align="center">
        <template #default="{ row }">
          <el-button size="small" @click="openEditDrawer(row)">Editar</el-button>
          <el-button
            :loading="isLoading"
            size="small"
            type="danger"
            @click="toggleStatus(row)"
          >
            {{ row.isActive ? "Desactivar" : "Activar" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer v-model="isDrawerVisible" title="Editar Notificación" size="40%">
    <el-form :model="editForm" label-width="120px" style="padding: 20px;">
      <el-form-item label="Nombre">
        <el-input v-model="editForm.name" disabled />
      </el-form-item>
      <el-form-item label="Días Antes">
        <el-select v-model="editForm.daysBefore" placeholder="Seleccione un período">
          <el-option label="60 días" value="60" />
          <el-option label="30 días" value="30" />
          <el-option label="15 días" value="15" />
          <el-option label="5 días" value="5" />
        </el-select>
      </el-form-item>
      <el-form-item label="Descripción">
        <el-input v-model="editForm.description" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveChanges">Guardar</el-button>
        <el-button @click="isDrawerVisible = false">Cancelar</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      :total="notificationConfigs.length"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
  </el-card>
</template>

<script setup>
import { ref, onMounted} from "vue";
import { useNotificationConfigStore } from "@/presentation/stores/Notifications.store";
import { useNotificationConfigViewModel } from "@/presentation/viewmodels/NotificationsViewModel";

const notificationStore = useNotificationConfigStore();
const {
  notificationConfigs,
  isLoading,
  currentPage,
  pageSize,
  paginatedData,
  handlePageChange,
  handleSizeChange,
  loadNotifications,
  showInactive,
  userId,
} = useNotificationConfigViewModel();

const isDrawerVisible = ref(false);
const editForm = ref({ id: null, name: "", daysBefore: "", isActive: false, description: "" });

const openEditDrawer = (notification) => {
  editForm.value = { ...notification };
  isDrawerVisible.value = true;
};

const saveChanges = async () => {
  try {
    editForm.value.modifiedBy = userId;
    const updatedData = {...editForm.value, notificationConfigId: editForm.value.id, };
    await notificationStore.updateNotificationConfigRequest(
      editForm.value.id,
      updatedData
    );
    isDrawerVisible.value = false;
    await loadNotifications();
  } catch (error) {
    console.error(error);
  }
};

const toggleStatus = async (notification) => {
  try {
    const updatedData = {
      isActive: !notification.isActive,
      modifiedBy: userId,
      notificationConfigId: notification.id, 
    };
    console.log("ID a enviar toggleStatus:", notification.id);
    await notificationStore.updateNotificationConfigRequest(
      notification.id,
      updatedData
    );
    await loadNotifications();
  } catch (error) {
    console.error(error);
  }
};

onMounted(loadNotifications);
</script>