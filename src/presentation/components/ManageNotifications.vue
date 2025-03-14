<template>
    <div class="p-6">
      <el-table :data="birthdayUsers" style="width: 100%">
        <el-table-column prop="userFirstName" label="Nombre" />
        <el-table-column prop="surName" label="Apellido"  width="150" />
        <el-table-column prop="birthday" label="Cumpleaños"  width="150"/>
        <el-table-column label="Recordatorio"  width="150" >
          <template v-slot="scope">
            <el-select v-model="scope.row.reminder" placeholder="Selecciona una opción" >
              <el-option label="No recordar" value="never" />
              <el-option label="30 días antes" value="30days" />
              <el-option label="15 días antes" value="15days" />
              <el-option label="7 días antes" value="7days" />
              <el-option label="1 día antes" value="1day" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Acciones" width="150">
          <template v-slot="scope">
            <el-button size="small" type="danger" @click="removeNotification(scope.row)">
              Deshacer
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <div class="footer">
        <el-button type="primary" @click="saveNotifications">Guardar Cambios</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const birthdayUsers = ref([]);
  
      onMounted(() => {
        birthdayUsers.value = [
          { userFirstName: "Juan", surName: "Pérez", userEmail: "juan@example.com", birthday: "10/03/1995", reminder: "never" },
          { userFirstName: "María", surName: "Gómez", userEmail: "maria@example.com", birthday: "22/06/1990", reminder: "15days" },
          { userFirstName: "Carlos", surName: "Rodríguez", userEmail: "carlos@example.com", birthday: "05/09/1987", reminder: "30days" },
          { userFirstName: "Ana", surName: "Fernández", userEmail: "ana@example.com", birthday: "17/12/1998", reminder: "7days" },
          { userFirstName: "Luis", surName: "Martínez", userEmail: "luis@example.com", birthday: "01/04/2000", reminder: "1day" },
        ];
      });
  
      const removeNotification = (user) => {
        user.reminder = "never";
      };
  
      const saveNotifications = () => {
        console.log("Notificaciones guardadas:", birthdayUsers.value);
      };
  
      return {
        birthdayUsers,
        removeNotification,
        saveNotifications,
      };
    }
  };
  </script>
  
  <style scoped>
  .p-6 {
    background-color: #fff;
  }
  .footer {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  