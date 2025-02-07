<template>
  <div class="w-64 h-screen fixed bg-gray-900 rounded-r-md">
    <div class="px-6 pt-8">
      <div class="flex items-center justify-between">
        <a href="#">
          <span
            class="material-symbols-outlined text-white bg-blue-500 p-1.5 rounded flex items-center justify-center"
          >
            check_box_outline_blank
          </span>
        </a>
        <button
          class="flex items-center justify-center p-0.5 rounded bg-gray-800"
        >
          <span class="material-symbols-outlined text-white"
            >arrow_left_alt</span
          >
        </button>
      </div>
    </div>

    <div class="px-6 pt-4">
      <input
        type="text"
        class="w-full rounded px-4 py-2.5 text-sm font-light bg-gray-800 text-gray-400 placeholder-gray-500"
        placeholder="Buscar"
      />
    </div>

    <div class="px-6 pt-4"><hr class="border-gray-700" /></div>

    <el-scrollbar height="350px">
      <div class="px-6 pt-4">
        <ul class="flex flex-col space-y-2">
          <!-- Inicio -->
          <li>
            <div class="text-gray-500 hover:text-white">
              <router-link
                to="/home"
                class="flex item-center w-full pl-2 pr-4 py-2 hover:bg-gray-800 rounded"
              >
                <span class="material-symbols-outlined pr-2"
                  >space_dashboard</span
                >
                Inicio
              </router-link>
            </div>
          </li>
          <li v-for="(item, index) in menuItems" :key="index">
            <div class="text-gray-500 hover:text-white">
              <div
                class="flex justify-between w-full pl-2 pr-4 py-2 hover:bg-gray-800 rounded cursor-pointer"
                @click="toggleMenu(index)"
              >
                <div class="flex">
                  <span class="material-symbols-outlined pr-2">{{
                    item.icon
                  }}</span>
                  {{ item.title }}
                </div>
                <span
                  class="material-symbols-outlined"
                  :class="{ 'rotate-180': openMenus[index] }"
                >
                  keyboard_arrow_down
                </span>
              </div>
            </div>

            <div
              v-show="openMenus[index]"
              class="ml-4 pl-2 text-gray-500 border-l border-gray-700"
            >
              <ul class="flex flex-col">
                <li
                  v-for="(subItem, subIndex) in item.subItems"
                  :key="subIndex"
                >
                  <router-link
                    :to="subItem.route"
                    class="inline-block w-full px-4 py-2 hover:bg-gray-800 hover:text-white rounded"
                  >
                    {{ subItem.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- Bolsa de trabajo -->
          <li>
            <div class="text-gray-500 hover:text-white">
              <router-link
                to="/"
                class="flex item-center w-full pl-2 pr-4 py-2 hover:bg-gray-800 rounded"
              >
                <span class="material-symbols-outlined pr-2">work_alert</span>
                Bolsa de trabajo
              </router-link>
            </div>
          </li>
          <!-- Soporte -->
          <li>
            <div class="text-gray-500 hover:text-white">
              <router-link
                to="/"
                class="flex item-center w-full pl-2 pr-4 py-2 hover:bg-gray-800 rounded"
              >
                <span class="material-symbols-outlined pr-2">support</span>
                Soporte y ayuda
              </router-link>
            </div>
          </li>
        </ul>
      </div>

      <div class="px-6 pt-4"></div>
      <div class="px-6 pt-4"><hr class="border-gray-700" /></div>

      <!-- Recursos humanos -->
      <div class="px-6 pt-4">
      <ul class="flex flex-col space-y-2">
        <li>
          <div class="text-gray-500 hover:text-white">
            <div
              class="flex justify-between w-full pl-2 pr-4 py-2 hover:bg-gray-800 rounded cursor-pointer"
              @click="toggleMenu(menuItems.length)"
            >
              <div class="flex">
                <span class="material-symbols-outlined pr-2">admin_panel_settings</span>
                Recursos humanos <!-- Título fijo -->
              </div>
              <span
                class="material-symbols-outlined"
                :class="{ 'rotate-180': openMenus[menuItems.length] }"
              >
                keyboard_arrow_down
              </span>
            </div>
          </div>

          <div
            v-show="openMenus[menuItems.length]"
            class="ml-4 pl-2 text-gray-500 border-l border-gray-700"
          >
            <ul class="flex flex-col">
              <li
                v-for="(subItem, subIndex) in recursosHumanosSubItems"
                :key="subIndex"
              >
                <router-link
                  :to="subItem.route"
                  class="inline-block w-full px-4 py-2 hover:bg-gray-800 hover:text-white rounded"
                >
                  {{ subItem.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

      <div class="px-6 pt-4"></div>
      <div class="px-6 pt-4"><hr class="border-gray-700" /></div>

      <div class="px-6 pt-4">
        <ul class="flex flex-col space-y-2">
          <!-- Configuraciones -->
          <li>
            <div class="text-gray-500 hover:text-white">
              <router-link
                to="/"
                class="flex item-center w-full pl-2 pr-4 py-2 hover:bg-gray-800 rounded"
              >
                <span class="material-symbols-outlined pr-2">settings</span>
                Configuraciones
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </el-scrollbar>
    <div
      class="absolute bottom-0 w-full pl-6 pr-4 py-4 bg-[#232529] flex items-center justify-between"
    >
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full">
          <img
            src="https://www.shareicon.net/data/512x512/2016/08/05/806962_user_512x512.png"
            alt="avatar"
          />
        </div>
        <div class="flex flex-col pl-3">
          <div class="text-sm text-gray-50">{{ getUsername }}</div>
          <span class="text-xs text-[#acacb0] font-light tracking-tight"
            >{{ getUserEmail }}</span
          >
        </div>
      </div>
      <button>
        <span class="text-gray-400 material-symbols-outlined">
          keyboard_arrow_down
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/presentation/stores/user.store"

const { getUsername, getUserEmail } = useUserStore();
 
// Estado para controlar qué menús están abiertos
const openMenus = ref<boolean[]>([]);

// Lista de elementos del menú
const menuItems = ref([
  {
    title: "Mi Perfil",
    icon: "person",
    subItems: 
    [
      {
        title: "Información personal",
        route: "/perfil/informacion-personal"
      },
      {
        title: "Información profesional",
        route: "/perfil/informacion-profesional"
      },
      {
        title: "Información salarial",
        route: "/perfil/informacion-salarial"
      },
      {
        title: "Tiempo libre",
        route: "/perfil/tiempo-libre"
      },
    ],
  },
  {
    title: "Nómina",
    icon: "payments",
    subItems: 
    [
      {
        title: "Comprobantes de pago",
        route: "/"
      },
      {
        title: "Mis beneficios",
        route: "/"
      },
    ],
  },
  {
    title: "Tiempo Libre",
    icon: "travel",
    subItems: 
    [
      {
        title: "Crear una ausencia",
        route: "/ausencias/solicitar-ausencia"
      },
      {
        title: "Mis ausencias",
        route: "/ausencias/mis-ausencias"
      }
    ],
  },
  {
    title: "Evaluaciones",
    icon: "spellcheck",
    subItems: 
    [
      {
        title: "Desempeño",
        route: "/"
      },
      {
        title: "Retroalimentación",
        route: "/"
      },
      {
        title: "Clima laboral",
        route: "/"
      },
    ],
  },
  {
    title: "Políticas y Documentos",
    icon: "policy",
    subItems: 
    [
      {
        title: "Manual del empleado",
        route: "/"
      },
      {
        title: "Reglamentos",
        route: "/"
      },
      {
        title: "procedimientos",
        route: "/"
      },
    ],
  },
  {
    title: "Solicitudes  y trámites",
    icon: "procedure",
    subItems: 
    [
      {
        title: "Carta laboral",
        route: "/"
      },
      {
        title: "Actualización de datos",
        route: "/"
      },
    ],
  },
]);

// Subitems para Recursos Humanos
const recursosHumanosSubItems = ref([
  {
    title: "Gestión de empleados",
    route: "/portal-rrhh/gestionar-empleados"
  },
  {
    title: "Gestión de vacantes y reclutamiento",
    route: "/portal-rrhh/gestionar-vacantes"
  },
  {
    title: "Control de asistencia",
    route: "/portal-rrhh/gestionar-ausencias"
  },
  {
    title: "Nómina y compensaciones",
    route: "/portal-rrhh/gestionar-nomina"
  },
  {
    title: "Gestión de beneficios",
    route: "/portal-rrhh/gestionar-beneficios"
  },
  {
    title: "Evaluaciones de desempeño",
    route: "/portal-rrhh/evaluaciones"
  },
  {
    title: "Capacitaciones",
    route: "/portal-rrhh/capacitaciones"
  },
  {
    title: "Reporte y análisis",
    route: "/portal-rrhh/reportes"
  },
  {
    title: "Políticas y procedimientos",
    route: "/portal-rrhh/gestionar-politicas"
  },
]);

// Alternar la visibilidad del menú
const toggleMenu = (index: number) => {
  openMenus.value[index] = !openMenus.value[index];
};
</script>

<style scoped>
/* Animación para el ícono de flecha */
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.router-link-exact-active {
  border-right: 4px solid #6b7280;
}
</style>