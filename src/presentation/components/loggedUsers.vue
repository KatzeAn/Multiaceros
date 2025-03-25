<template> 
  <div class="p-6">
    <el-table :data="connectedUsers" style="width: 100%">
      <el-table-column prop="userFirstName" :label="t('name')" />
      <el-table-column prop="surName" :label="t('surname')" />
      <el-table-column prop="userEmail" :label="t('email')" />
      <el-table-column prop="status" :label="t('status')">
        <template v-slot="scope">
          <el-tag :type="scope.row.status === t('session_active') ? 'success' : 'danger'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="t('actions')" width="150"> 
        <template v-slot="scope">
          <el-button size="small" type="danger" @click="logoutUser(scope.row)">
            {{ t('logout') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const connectedUsers = ref([]);

onMounted(() => {
  connectedUsers.value = [
    { userFirstName: "Juan", surName: "Pérez", userEmail: "juan@example.com", status: t("session_active") },
    { userFirstName: "María", surName: "Gómez", userEmail: "maria@example.com", status: t("session_active") },
    { userFirstName: "Carlos", surName: "Rodríguez", userEmail: "carlos@example.com", status: t("session_active") },
    { userFirstName: "Ana", surName: "Fernández", userEmail: "ana@example.com", status: t("session_active") },
    { userFirstName: "Luis", surName: "Martínez", userEmail: "luis@example.com", status: t("session_active") },
  ];
});

const logoutUser = (user) => {
  user.status = t("session_inactive");
};

</script>


<style scoped>
.p-6 {
background-color: #fff;
}
</style>
