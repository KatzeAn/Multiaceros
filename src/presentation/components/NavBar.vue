<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo w-full shadow-md"
    mode="horizontal"
    background-color="white"
    text-color="#2A3D66"
    active-text-color="#2A3D66"
    @select="handleSelect"
  >
    <el-menu-item index="0" class="logo">
      <img :src="logo" alt="Logo" class="logo-img" />
    </el-menu-item>

    <el-menu-item index="1">
      <router-link to="/home" @click.prevent="navigateAndReload">{{ t('home') }}</router-link>
    </el-menu-item>
    
    <div class="ml-auto flex items-center">
      <div class="ml-4"><LanguageSwitcher /></div>
      
      <el-menu-item index="2" class="relative flex items-center">
  <el-badge :value="12" :show-zero="false" badge-class="mt-1 mr-2">
    <button
      type="button"
      class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
      @click.stop="toggleNotificationsDropdown"
    >
      <i class="ri-notification-3-line">
        <span class="material-symbols-outlined"> notifications </span>
      </i>
    </button>
  </el-badge>

  <!-- Cuadro desplegable de notificaciones -->
  <div
    v-if="isNotificationsDropdownOpen"
    class="absolute right-0 z-10 top-full w-64 h-48 rounded-md bg-white py-2 px-4 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
    role="menu"
    aria-orientation="vertical"
    tabindex="-1"
  >
    <p class="text-gray-400 text-center">No hay notificaciones</p>
  </div>
</el-menu-item>

      <el-sub-menu index="3">
        <template #title>
          <img :src="mujer" alt="Perfil" class="w-8 h-8 rounded-full object-cover" />
        </template>
        <el-menu-item index="3-1">Mi perfil</el-menu-item>
        <el-menu-item index="3-2">Configuraciones</el-menu-item>
        <el-menu-item index="3-3" @click="cerrarSesion">Cerrar Sesión</el-menu-item>
      </el-sub-menu>
    </div>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/presentation/components/LanguageSwitcher.vue";
import mujer from '@/presentation/assets/hombre2.jpg';
import logo from "@/presentation/assets/vertical.png";

const { t } = useI18n();
const useAuth = useAuthStore();
const router = useRouter();

const activeIndex = ref("1");
const isNotificationsDropdownOpen = ref(false);

const navigateAndReload = () => {
  router.push("/home").then(() => {
    window.location.reload();
  });
};

const cerrarSesion = () => {
  useAuth.logout();
};

const toggleNotificationsDropdown = () => {
  isNotificationsDropdownOpen.value = !isNotificationsDropdownOpen.value;
};

const handleSelect = (key: string) => {
  console.log("Menu item selected:", key);
};
</script>

<style scoped>
.el-menu-demo {
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>