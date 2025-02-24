<template>
  <div class="p-6">
    <el-table :data="connectedUsers" style="width: 100%">
      <el-table-column prop="userFirstName" label="Nombre" />
      <el-table-column prop="surName" label="Apellido" />
      <el-table-column prop="userEmail" label="Correo Electrónico" />
      <el-table-column prop="status" label="Estado">
        <template v-slot="scope">
          <el-tag :type="scope.row.status === 'En sesión' ? 'success' : 'danger'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Acciones">
        <template v-slot="scope">
          <el-button size="small" type="danger" @click="logoutUser(scope.row)">Cerrar Sesión</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
setup() {
  const connectedUsers = ref([]);

  onMounted(() => {
    // Simulación de datos de usuarios conectados
    connectedUsers.value = [
      { userFirstName: "Juan", surName: "Pérez", userEmail: "juan@example.com", status: "En sesión" },
      { userFirstName: "María", surName: "Gómez", userEmail: "maria@example.com", status: "En sesión" },
      { userFirstName: "Carlos", surName: "Rodríguez", userEmail: "carlos@example.com", status: "En sesión" },
      { userFirstName: "Ana", surName: "Fernández", userEmail: "ana@example.com", status: "En sesión" },
      { userFirstName: "Luis", surName: "Martínez", userEmail: "luis@example.com", status: "En sesión" },
    ];
  });

  const logoutUser = (user) => {
    user.status = "Desconectado";
  };

  return {
    connectedUsers,
    logoutUser,
  };
}
};
</script>

<style scoped>
.p-6 {
background-color: #fff;
}
</style>
