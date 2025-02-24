<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Panel de Gestión Administrativa</h1>
  
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-md flex items-center">
          <i class="el-icon-user text-3xl text-blue-500 mr-4"></i>
          <div>
            <p class="text-lg font-semibold">Usuarios Conectados</p>
            <p class="text-xl">150</p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold mb-2">Conexiones por Hora</h2>
          <el-progress :percentage="60" status="success"></el-progress>
          <el-progress :percentage="30" status="warning"></el-progress>
          <el-progress :percentage="10" status="exception"></el-progress>
        </div>
      </div>
      <div class="mt-10">
        <el-button type="primary" @click="showConnectedUsers = true">Ver usuarios Conectados</el-button>
      </div>
  
      <el-dialog v-model="showConnectedUsers" title="Usuarios Conectados" width="40%">
        <loggedUsers :connectedUsers="users" />
        <template #footer>
          <el-button @click="showConnectedUsers = false">Cerrar</el-button>
        </template>
      </el-dialog>
      <div class="mt-6 bg-white p-6 rounded-xl shadow-lg">
    <h2 class="text-lg font-semibold mb-4">Lista de Usuarios</h2>
    <el-input v-model="searchQuery" placeholder="Buscar usuario..." clearable class="mb-4 w-1/3"/>
    <el-table :data="filteredUsers" style="width: 100%" border stripe>
      <el-table-column label="Nombre" prop="userFirstName" />
      <el-table-column label="Apellido" prop="surName" />
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
  
      <!-- cambiar rol -->
      <el-dialog v-model="isDialogVisible" title="Cambiar Rol" width="30%">
        <el-select v-model="selectedRoleId" placeholder="Selecciona un rol">
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
        </el-select>
        <template #footer>
          <el-button @click="isDialogVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="confirmRoleChange">Confirmar</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useUserStore } from "@/presentation/stores/user.store";
  import { useRoleStore } from "@/presentation/stores/role.store";
  import loggedUsers from "@/presentation/components/loggedUsers.vue";
  
  const userStore = useUserStore();
  const roleStore = useRoleStore();
  
  const searchQuery = ref("");
  const users = ref([]);
  const roles = ref([]);
  const isDialogVisible = ref(false);
  const selectedRoleId = ref(null);
  const selectedUser = ref(null);
  const showConnectedUsers = ref(false);
  
  onMounted(async () => {
    const result = await userStore.fetchUsers();
    users.value = Array.isArray(result) ? result : result.users || [];
    await roleStore.fetchRoles();
    roles.value = roleStore.roles;
  });
  
  const filteredUsers = computed(() =>
    users.value.filter(user =>
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
  