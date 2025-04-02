<template>
  <div>
    <!-- Sidebar para pantallas grandes -->
    <el-menu
      class="sidebar"
      v-show="isDesktop"
      default-active="1"
      background-color="#2A3D66"
      text-color="#fff"
    >
      <el-menu-item>
        <el-icon><location /></el-icon>
        <span>{{ t('inicio') }}</span>
      </el-menu-item>

      <el-menu-item>
        <el-icon><icon-menu /></el-icon>
        <span>{{ t('miPerfil') }}</span>
      </el-menu-item>

      <el-menu-item>
        <el-icon><document /></el-icon>
        <span>{{ t('misPostulaciones') }}</span>
      </el-menu-item>

      <el-menu-item>
        <el-icon><setting /></el-icon>
        <span>{{ t('configuracion') }}</span>
      </el-menu-item>

      <el-menu-item index="5" @click="logout">
        <el-icon><User /></el-icon>
        <span>{{ t('portalEmpleados') }}</span>
      </el-menu-item>
    </el-menu>

    <!-- Navbar inferior para pantallas pequeñas -->
    <div v-show="!isDesktop" class="bottom-navbar">
      <button @click="navigate('vacantes')" class="nav-item">
        <el-icon><location /></el-icon>
      </button>
      <button @click="navigate('miPerfil')" class="nav-item">
        <el-icon><icon-menu /></el-icon>
      </button>
      <button @click="navigate('misPostulaciones')" class="nav-item">
        <el-icon><document /></el-icon>
      </button>
      <button @click="navigate('configuracion')" class="nav-item">
        <el-icon><setting /></el-icon>
      </button>
      <button @click="logout" class="nav-item">
        <el-icon><User /></el-icon>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from "vue-router";
import { Document, Menu as IconMenu, Location, Setting, User } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const isDesktop = ref(window.innerWidth > 800);

const updateScreenSize = () => {
  isDesktop.value = window.innerWidth > 800;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});

const logout = () => {
  router.push("/");
};

const navigate = (route: string) => {
  router.push(`/${route}`);
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  width:  256px;
}

.bottom-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2A3D66;
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

@media (max-width: 800px) {
  .sidebar {
    display: none;
  }
}
</style>
