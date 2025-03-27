<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import mujer from '@/presentation/assets/hombre2.jpg';
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/presentation/components/LanguageSwitcher.vue"

const { t } = useI18n(); 
const useAuth = useAuthStore();
const router = useRouter();
const navigateAndReload = () => {
  router.push("/home").then(() => {
    window.location.reload();
  });
};


const cerrarSesion = () => {
  useAuth.logout();
}
// Estado para los dropdowns
const isProfileDropdownOpen = ref(false);
const isNotificationsDropdownOpen = ref(false);

// Función para alternar el dropdown de perfil
const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
  isNotificationsDropdownOpen.value = false; // Cierra notificaciones si se abre el perfil
};

// Función para alternar el dropdown de notificaciones
const toggleNotificationsDropdown = () => {
  isNotificationsDropdownOpen.value = !isNotificationsDropdownOpen.value;
  isProfileDropdownOpen.value = false; // Cierra perfil si se abren notificaciones
};

// Función para cerrar dropdowns al hacer clic fuera
const closeDropdownsOnClickOutside = (event: MouseEvent) => {
  const profileDropdown = document.querySelector(".profile-dropdown");
  const notificationsDropdown = document.querySelector(".notifications-dropdown");

  if (
    profileDropdown &&
    !profileDropdown.contains(event.target as Node) &&
    notificationsDropdown &&
    !notificationsDropdown.contains(event.target as Node)
  ) {
    isProfileDropdownOpen.value = false;
    isNotificationsDropdownOpen.value = false;
  }
};


// Montar y desmontar eventos globales
onMounted(() => {
  document.addEventListener("click", closeDropdownsOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdownsOnClickOutside);
});
</script>

<template>
  <div
    class="w-full py-2 px-6 bg-neutral-50 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30"
  >
    <button type="button" class="text-lg text-gray-600 sidebar-toggle"></button>
    

    <ul class="flex items-center text-sm ml-4">
      <li class="mr-2">
        <a href="#" class="text-gray-600 hover:text-gray-600 font-medium">
          <router-link to="/home" @click.prevent="navigateAndReload">{{ t('home') }}</router-link>
        </a>
      </li>
    </ul>
    <ul class="ml-auto flex items-center"><div class="ml-4">
  <LanguageSwitcher />
</div>
      <!-- Dropdown de notificaciones -->
      <li class="dropdown ml-3 relative notifications-dropdown">
        <el-badge :value="12" :show-zero="false" badge-class="mt-1 mr-2">
          <button
            type="button"
            class="dropdown-toggle text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:bg-gray-50 hover:text-gray-600"
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
          class="absolute right-0 z-10 mt-2 w-64 h-48 origin-top-right rounded-md bg-white py-2 px-4 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
          role="menu"
          aria-orientation="vertical"
          tabindex="-1"
        >
          <p class="text-gray-400 text-center">No hay notificaciones</p>
        </div>
      </li>

      <!-- Dropdown de perfil -->
      <li class="dropdown ml-3 relative profile-dropdown">
        <button
          type="button"
          class="dropdown-toggle flex gap-3 items-center"
          @click.stop="toggleProfileDropdown"
        >
        <img :src="mujer" alt="Perfil" class="w-8 h-8 rounded-full object-cover" />
        </button>

        <!-- Dropmenu - perfil con transición -->
        <div
          v-if="isProfileDropdownOpen"
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
          role="menu"
          aria-orientation="vertical"
          tabindex="-1"
        >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            >Mi perfil</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            >Configuraciones</a
          >
          <button
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          @click="cerrarSesion"
        >
          Cerrar Sesión
        </button>

        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Estilos adicionales para personalizar el cuadro de notificaciones */
</style>
