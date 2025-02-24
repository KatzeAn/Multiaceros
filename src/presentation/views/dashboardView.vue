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
  
      <!-- Lista de Usuarios -->
      <div class="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold mb-4">Lista de Usuarios</h2>
        <el-input v-model="searchQuery" placeholder="Buscar usuario" clearable class="mb-4" />
  
        <el-table :data="filteredUsers" style="width: 100%">
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="userFirstName" label="Nombre" />
          <el-table-column prop="userEmail" label="Correo Electrónico" />
          <el-table-column label="Rol">
            <template v-slot="scope">
              {{ getRoleName(scope.row.roleId) }}
            </template>
          </el-table-column>
          <el-table-column label="Acciones">
            <template v-slot="scope">
              <el-button size="small" @click="openRoleChangeDialog(scope.row)">Cambiar Rol</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
      <!-- Modal para cambiar rol -->
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
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import { useUserStore } from "@/presentation/stores/user.store";
  import { useRoleStore } from "@/presentation/stores/role.store";
  
  export default {
    setup() {
      const userStore = useUserStore();
      const roleStore = useRoleStore();
  
      const searchQuery = ref("");
      const users = ref([]);
      const roles = ref([]);
      const isDialogVisible = ref(false);
      const selectedRoleId = ref(null);
      const selectedUser = ref(null);
  
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
  
      const getRoleName = roleId => {
        const role = roles.value.find(r => r.id === roleId);
        return role ? role.name : "Desconocido";
      };
  
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
  }
};
  
      return {
        searchQuery,
        roles,
        users,
        filteredUsers,
        getRoleName,
        openRoleChangeDialog,
        confirmRoleChange,
        isDialogVisible,
        selectedRoleId
      };
    }
  };
  </script>
  
  <style scoped>
  .bg-white {
    background-color: #fff;
  }
  </style>