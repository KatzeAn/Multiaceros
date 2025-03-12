<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Panel de Gestión Administrativa</h1>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white h-40 rounded-xl shadow-lg flex items-center border border-gray-200 w-96">
        <el-icon :size="50" class="text-3xl ml-3"><Avatar /></el-icon>
        <div class="ml-6">
          <p class="text-gray-500 text-sm uppercase font-medium">Usuarios Conectados</p>
          <p class="text-2xl font-semibold text-gray-900">{{ connectedUsersCount }}</p>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mb-2">Conexiones por Hora</h2>
        <graficConnection />
      </div>
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="Lista de Usuarios" name="users">
        <div class="mt-6 bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Lista de Usuarios</h2>
          <el-input v-model="searchQuery" placeholder="Buscar usuario..." clearable class="mb-4 w-1/3"/>
        <el-table :data="filteredUsers" style="width: 100%" border stripe>
          <el-table-column label="Nombre" prop="userFirstName" />
          <el-table-column label="Apellido" prop="surName" />
          <el-table-column label="Estado">
            <template #default="{ row }">
              <el-tag :type="row.isActive ? 'success' : 'danger'">
                {{ row.isActive ? "Activo" : "Inactivo" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Correo Electrónico" prop="userEmail" />
          <el-table-column label="Acciones" align="center">
            <template #default="scope">
              <el-button size="small" @click="openRoleChangeDialog(scope.row)">
                Cambiar Rol
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="Usuarios Conectados" name="connectedUsers">
        <loggedUsers :connectedUsers="users" />
      </el-tab-pane>

      <el-tab-pane label="Gestión de Notificaciones" name="notifications">
        <ManageNotificacions :notifications="notifications" />
      </el-tab-pane>
      
      <el-tab-pane label="Gestión de Contratos" name="contracts">
        <ManageContracts />
      </el-tab-pane>

      <el-tab-pane label="Subir  Contratos" name="contractsupload">
        <UploadContracts/>
      </el-tab-pane>

    </el-tabs>

    <el-dialog v-model="isDialogVisible" title="Cambiar Rol" width="30%">
  <el-select v-model="selectedRoleId" placeholder="Selecciona un rol">
    <el-option v-for="role in availableRoles"  :key="role.id" :label="role.name" :value="role.id" />
  </el-select>
  <template #footer>
    <el-button @click="isDialogVisible = false">Cancelar</el-button>
    <el-button type="primary" @click="confirmRoleChange">Confirmar</el-button>
  </template>
</el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/presentation/stores/user.store";
import { useRoleStore } from "@/presentation/stores/role.store";
import loggedUsers from "@/presentation/components/loggedUsers.vue";
import { Avatar } from '@element-plus/icons-vue';
import ManageNotificacions from "@/presentation/components/ManageNotifications.vue";
import ManageContracts from "@/presentation/components/ManageContracts.vue";
import graficConnection from "@/presentation/components/graficConnection.vue";
import UploadContracts from "@/presentation/components/UploadContracts.vue";

const availableRoles = computed(() => roleStore.roles); 
const userStore = useUserStore();
const roleStore = useRoleStore();

const searchQuery = ref("");
const users = ref([]);
const isDialogVisible = ref(false);
const selectedRoleId = ref(null);
const selectedUser = ref(null);
const activeTab = ref("users");
const connectedUsersCount = ref(0);
let interval = null;

const fetchActiveUsers = async () => {
  try {
    connectedUsersCount.value = await userStore.getUserCount();
  } catch (error) {
    console.error("Error al obtener usuarios conectados", error);
  }
};

onMounted(async () => {
  const result = await userStore.fetchUsers();
  users.value = Array.isArray(result) ? result : result.users || [];
  await roleStore.fetchRoles(true);
  fetchActiveUsers();
  interval = setInterval(() => {
    fetchActiveUsers();
  }, 30000); // Actualiza cada 30 segundos
});

onUnmounted(() => {
  clearInterval(interval);
});

const filteredUsers = computed(() =>
  users.value.filter((user) =>
    user.userFirstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const openRoleChangeDialog = user => {
  selectedUser.value = user;
  selectedRoleId.value = user.roleId;
  isDialogVisible.value = true;
};

const confirmRoleChange = async () => {
  if (!selectedUser.value || !selectedRoleId.value) return;
  try {
    await roleStore.assignUserRole(selectedUser.value.id, {
      roleId: selectedRoleId.value,
      modifiedBy: "Admin"
    });
    selectedUser.value.roleId = selectedRoleId.value;
    isDialogVisible.value = false;
  } catch (error) {
    console.error("Error al cambiar rol", error);
  }
};
</script>

<style scoped>
.bg-white {
  background-color: #fff;
}
</style>
