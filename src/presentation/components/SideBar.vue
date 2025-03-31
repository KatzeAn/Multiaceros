<template>
  <div class="sidebar-container">
    <aside class="sidebar w-64 h-screen fixed bg-gray-900 rounded-r-md">
      <el-scrollbar height="100%">
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
        :placeholder="t('search')"
      /> 
    </div>
    <div class="px-6 pt-4"><hr class="border-gray-700" /></div>

    <el-scrollbar height="calc(100vh - 250px)">
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
                {{ t('home') }}
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
                <button
                  v-if="subItem.action"
                  @click="subItem.action"
                  class="inline-block w-full px-4 py-2 rounded text-left hover:bg-gray-800 hover:text-white"
                >
                  {{ subItem.title }}
                </button>

                <router-link
                  v-else
                  :to="subItem.route !== '#' ? subItem.route : '/'"
                  class="inline-block w-full px-4 py-2 rounded"
                  :class="{
                    'hover:bg-gray-800 hover:text-white': 
                    subItem.route !== '#',
                    'opacity-50 cursor-not-allowed pointer-events-none': 
                    subItem.route === '#',
                  }"
                >
                  {{ subItem.title }}
                </router-link>
              </li>
              </ul>
            </div>
          </li>
          <!-- Bolsa de trabajo -->
          <li>
            <div
              class="text-gray-500"
              :class="{
                'hover:text-white hover:bg-gray-800': false,
                'opacity-50 cursor-not-allowed pointer-events-none': true,
              }"
            >
              <router-link
                to="/"
                class="flex item-center w-full pl-2 pr-4 py-2 rounded"
                @click.prevent
              >
                <span class="material-symbols-outlined pr-2">work_alert</span>
                {{ t('jobBoard') }}
              </router-link>
            </div>
          </li>
          <!-- Soporte -->
          <li>
            <div
              class="text-gray-500"
              :class="{
                'hover:text-white hover:bg-gray-800': false,
                'opacity-50 cursor-not-allowed pointer-events-none': true,
              }"
            >
              <router-link
                to="/"
                class="flex item-center w-full pl-2 pr-4 py-2 rounded"
                @click.prevent
              >
              <span class="material-symbols-outlined pr-2">support</span>
                {{ t('support') }}
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
                  <span class="material-symbols-outlined pr-2"
                    >admin_panel_settings</span
                  >
                   {{ t('humanResources') }}
                  <!-- Título fijo -->
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
              :to="subItem.route !== '#' ? subItem.route : '/'"
              class="inline-block w-full px-4 py-2 rounded"
              :class="{
                'hover:bg-gray-800 hover:text-white': subItem.route !== '#',
                'opacity-50 cursor-not-allowed pointer-events-none': subItem.route === '#',
              }"
            >
              {{ subItem.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>

<div class="px-6 pt-4"><hr class="border-gray-700" /></div>
<div class="px-6 pt-4">
  <ul class="flex flex-col space-y-2">
    <li>
      <router-link to="/portal-rrhh/gestion-administrativa" class="text-gray-500 hover:text-white flex items-center pl-2 pr-4 py-2 hover:bg-gray-800 rounded">
        <span class="material-symbols-outlined pr-2">bar_chart</span>
        {{ t('administrativeManagement') }}
      </router-link>
    </li>
  </ul>
</div>

      <div class="px-6 pt-4">
        <ul class="flex flex-col space-y-2">
          <!-- Configuraciones -->
        <li>
          <div class="text-gray-500 hover:text-white hover:bg-gray-800">
            <router-link
              to="/configuraciones"
              class="flex items-center w-full pl-2 pr-4 py-2 rounded"
            >
              <span class="material-symbols-outlined pr-2">settings</span>
              {{ t('settings') }}
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
            :src="mujer"
            alt="Perfil"
            class="w-[2rem] h-[2rem] rounded-full object-cover"
          />
        </div>
        <div class="flex flex-col pl-3">
          <div class="text-sm text-gray-50">{{ getUsername }}</div>
          <span class="text-xs text-[#acacb0] font-light tracking-tight"></span>
        </div>
      </div>
      <button>
        <span class="text-gray-400 material-symbols-outlined">
          keyboard_arrow_down
        </span>
      </button>
    </div>
  </div>
</el-scrollbar>
    </aside>

    <nav class="navbar fixed bottom-0 left-0 w-full bg-gray-900 z-50 p-4 sm:hidden">
      <ul class="flex  justify-evenly overflow-x-auto">
        <li>
          <router-link to="/home" class="text-gray-400 hover:text-white">
            <span class="material-symbols-outlined">space_dashboard</span>
          </router-link>
        </li>
        <li v-for="(item, index) in menuItems" :key="index">
          <el-popover placement="top" trigger="click" :width="260">
            <template #reference>
              <button class="text-gray-400 hover:text-white">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
              </button>
            </template>
            <el-menu background-color="#2d3748" text-color="#a0aec0" active-text-color="#ffffff"  >
              <el-menu-item v-for="(subItem, subIndex) in item.subItems" :key="subIndex" >
                <router-link
                  v-if="subItem.route"
                  :to="subItem.route"
                  class="block px-4 py-2 rounded truncate"
                >
                  {{ subItem.title }}
                </router-link>
                <button
                  v-else-if="subItem.action"
                  @click="subItem.action"
                  class="block px-4 py-2 rounded truncate"
                >
                  {{ subItem.title }}
                </button>
              </el-menu-item>
            </el-menu>
          </el-popover>
        </li>

        <li>
          <el-popover placement="top" trigger="click" :width="270">
            <template #reference>
              <button class="text-gray-400 hover:text-white">
                <span class="material-symbols-outlined">admin_panel_settings</span>
              </button>
            </template>

            <el-menu background-color="#2d3748" text-color="#a0aec0" active-text-color="#ffffff"  >
              <el-menu-item v-for="(subItem, subIndex) in recursosHumanosSubItems" :key="subIndex"  >
                <router-link
                  :to="subItem.route"
                  class="block px-4 py-2 rounded truncate"
                >
                  {{ subItem.title }}
                </router-link>
              </el-menu-item>
            </el-menu>
          </el-popover>
        </li>
        <li>
          <router-link to="/portal-rrhh/gestion-administrativa" class="text-gray-400 hover:text-white">
            <span class="material-symbols-outlined">bar_chart</span>
          </router-link>
        </li>
        <li>
          <router-link to="/configuraciones" class="text-gray-400 hover:text-white">
            <span class="material-symbols-outlined">settings</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/presentation/stores/user.store";
import mujer from "@/presentation/assets/hombre2.jpg";
import { useCertifiedStore } from "../stores/certified.store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const certifiedStore = useCertifiedStore();
const { downloadCertificate } = certifiedStore;
const userStore = useUserStore();
const isLoadingLetterCertfied = ref(false);

const downloadLetter = async () => {
  isLoadingLetterCertfied.value = true;
  try {
    const userId = Number(userStore.getUserId);
    if (!isNaN(userId)) {  
        await downloadCertificate(userId);
    }  
  } catch (error) {
    console.error("Error al descargar la carta laboral:", error);
  } finally {
    isLoadingLetterCertfied.value = false;
  }
};

const { getUsername } = useUserStore();

// Lista de elementos del menú
const menuItems = ref([
  {
    title: t('miPerfil'),
    icon: "person",
    subItems: [
      {
        title: t('informacionPersonal'),
        route: "/perfil/informacion-personal",
      },
      // {
      //   title: "Información profesional",
      //   route: "#",
      // },
      // {
      //   title: "Información salarial",
      //   route: "#",
      // },
      // {
      //   title: "Tiempo libre",
      //   route: "#",
      // },
    ],
  },
  {
    title: t('nomina'),
    icon: "payments",
    subItems: [
      {
        title: t('comprobantesPago'),
        route: "/nomina/comprobante",
      },
      {
        title: t('historialPago'),
        route: "/nomina/historial",
      },
    ],
  },
  {
    title: t('tiempoLibre'),
    icon: "travel",
    subItems: [
      {
        title: t('crearAusencia'),
        route: "/ausencias/solicitar-ausencia",
      },
      // {
      //   title: "Mis ausencias",
      //   route: "#",
      // },
    ],
  },
 
  //{
   // title: "Políticas y Documentos",
    //icon: "policy",
    //subItems: [
      //{
       // title: "Manual del empleado",
       // route: "#",
      //},
      //{
      //  title: "Reglamentos",
        //route: "#",
      //},
     // {
       // title: "procedimientos",
      //  route: "#",
     // },
   // ],
  //},
  {
    title: t('solicitudesTramites'),
    icon: "procedure",
    subItems: [
      {
        title: t('cartaLaboral'),
        route: "",
        action: downloadLetter,
      },
      {
        title: t('actualizacionDatos'),
        route: "/solicitud/actualizacion-datos",
      },
    ],
  },
]);

// Subitems para Recursos Humanos
const recursosHumanosSubItems = ref([
  {
    title: t('gestionEmpleados'),
    route: "/portal-rrhh/empleados",
  },
  {
    title: t('gestionVacantes'),
    route: "/portal-rrhh/aplicaciones",
  },
  {
    title: t('controlAsistencia'),
    route: "/portal-rrhh/gestionar-ausencias",
  },
  {
    title: t('nominaCompensacion'),
    route: "/portal-rrhh/gestionar-nomina",
  },
  {
    title: t('pausasActivas'),
    route: "/portal-rrhh/gestion-pausas",
  },
  {
    title: t('tramites'),
    route: "/portal-rrhh/trámites",
  },
  //{
   // title: "Reporte y análisis",
    //route: "#",
  //},
  //{
   // title: "Políticas y procedimientos",
    //route: "#",
  //},
]);

const openMenus = ref<boolean[]>(Array(menuItems.value.length).fill(false));

// Alternar la visibilidad del menú
const toggleMenu = (index: number) => {
  openMenus.value[index] = !openMenus.value[index];
};
</script>

<style scoped>
.sidebar-container {
  position: relative;
}

.navbar {
  display: none;
}

@media (max-width: 800px) {
  .sidebar {
    display: none;
  }

  .navbar {
    display: block;
  }
}

</style>
