<template>
  <div>
    <aside 
      v-if="!isSmallScreen" 
      :class="`${isExpanded ? 'is-expanded' : 'collapsed'}`">
      <div class="logo">
        <img src="../assets/Logo 1-.png" alt="logo">
      </div>

      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>

      <h3 v-if="isExpanded">Menú</h3>
      <div class="menu">
        <router-link class="button" to="/home">
          <span class="material-symbols-outlined">home</span>
          <span v-if="isExpanded" class="text">Inicio</span>
        </router-link>
        <router-link class="button" to="/certificados">
          <span class="material-symbols-outlined">analytics</span>
          <span v-if="isExpanded" class="text">Certificados</span>
        </router-link>
        <router-link class="button" to="/comprobantes">
          <span class="material-symbols-outlined">attach_money</span>
          <span v-if="isExpanded" class="text">Comprobantes</span>
        </router-link>
        <router-link class="button" to="/vacaciones">
          <span class="material-symbols-outlined">beach_access</span>
          <span v-if="isExpanded" class="text">Vacaciones y Ausencias</span>
        </router-link>

        <div class="menu-item">
          <div class="button" @click="togglePortal">
            <span class="material-symbols-outlined">group</span>
            <span v-if="isExpanded" class="text">Portal Recursos Humanos</span>
          </div>
          <div v-show="isPortalExpanded" class="dropdown">
            <router-link to="/portal-rrhh/gestionar-empleados">Gestionar Empleados</router-link>
            <router-link to="/portal-rrhh/gestionar-pausas">Gestionar Pausas Activas</router-link>
            <router-link to="/portal-rrhh/gestionar-postulaciones">Gestionar postulaciones</router-link>
            <router-link to="/portal-rrhh/gestionar-ausencias">Gestionar Ausencias</router-link>
          </div>
        </div>
      </div>

      <div class="flex"></div>

      <div class="menu">
        <router-link class="button" to="/configuracion">
          <span class="material-symbols-outlined">settings</span>
          <span v-if="isExpanded" class="text">Configuración</span>
        </router-link>
      </div>
    </aside>
    <nav v-else class="navbar">
      <router-link class="nav-item" to="/home">
        <span class="material-symbols-outlined">home</span>
      </router-link>
      <router-link class="nav-item" to="/certificados">
        <span class="material-symbols-outlined">analytics</span>
      </router-link>
      <router-link class="nav-item" to="/comprobantes">
        <span class="material-symbols-outlined">attach_money</span>
      </router-link>
      <router-link class="nav-item" to="/vacaciones">
        <span class="material-symbols-outlined">beach_access</span>
      </router-link>
      <div class="menu-item">
        <div @click="togglePortal" class="nav-item">
          <span class="material-symbols-outlined">group</span>
        </div>
        <div 
          v-show="isPortalExpanded" 
          :class="['dropdown', isSmallScreen ? 'navbar-dropdown' : 'sidebar-dropdown']"
        >
          <router-link to="/portal-rrhh/gestionar-empleados">Gestionar Empleados</router-link>
          <router-link to="/portal-rrhh/gestionar-pausas">Gestionar Pausas Activas</router-link>
          <router-link to="/portal-rrhh/gestionar-postulaciones">Gestionar postulaciones</router-link>
          <router-link to="/portal-rrhh/gestionar-ausencias">Gestionar Ausencias</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const isExpanded = ref(false);
const isSmallScreen = ref(window.innerWidth < 700);
const isPortalExpanded = ref(false);

const ToggleMenu = () => {
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
    isPortalExpanded.value = false;
  }
};

const togglePortal = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
  }
  isPortalExpanded.value = !isPortalExpanded.value;
};

const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 700;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
aside {
  position: fixed;
  z-index: 99;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  background-color: var(--secondary-color);
  color: var(--light-color);
  transition: width 0.3s ease-in-out;
}
aside .menu .button .text {
  color: #fff;
  font-size: 1rem;
}

aside.collapsed {
  width: 64px;
}

aside.is-expanded .menu .button {
  justify-content: flex-start; 
}
aside .menu-toggle-wrap .menu-toggle:hover .material-symbols-outlined {
    color: var(--primary-color);
    transform: translateX(0.2rem);
}
aside .logo img {
    width: 2rem;
}

aside .menu {
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%;
}
aside .menu .button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.7rem 1rem;
  transition: background-color 0.2s ease-in-out;
  justify-content: center;
  width: 100%;
}

aside .menu .button .material-symbols-outlined {
  font-size: 2rem;
  color: var(--light-color);
}

aside .menu .button:hover {
  background-color: var(--primary-alt-color);
}

.router-link-exact-active {
  border-right: 4px solid var(--primary-color);
}
aside .menu .button:hover .material-symbols-outlined,
aside .menu .button:hover .text {
    font-weight: bold;
    transition: 0.2s ease-out;
}

.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: var(--secondary-color);
  padding: 0.7rem 0;
  z-index: 99;
}
.menu-item {
  position: relative;
}

.navbar .nav-item {
  text-decoration: none;
  color: var(--light-color);
  font-size: 1.5rem;
  transition: color 0.3s ease-in-out;
}

.navbar .nav-item:hover {
  color: var(--primary-color);
}
.dropdown {
  width: 100%;
  font-size: 0.85rem; 
  margin-left: 1rem; 
  padding: 0.3rem 0; 
}

.dropdown a {
  display: block;
  padding: 0.2rem 0.5rem; 
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem; 
}

.dropdown a:hover {
  background-color: var(--primary-alt-color);
  font-weight: bold;
}
.menu-item {
  position: relative;
}

.navbar-dropdown {
  position: absolute;
  bottom: 100%; 
  left: 50%; 
  transform: translateX(-50%);
  width: 250px; 
  font-size: 1rem; 
  margin-bottom: 0.9rem;
  padding: 0.5rem 0; 
  background-color: var(--secondary-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px; 
}
.sidebar-dropdown {
  position: absolute;
  left: 100%; 
  top: 0;
  width: 200px;
  font-size: 0.85rem;
  margin-left: 0.2rem;
  padding: 0.3rem 0;
  background-color: var(--secondary-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.dropdown a {
  display: block;
  padding: 0.2rem 0.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
}

.dropdown a:hover {
  background-color: var(--primary-alt-color);
  font-weight: bold;
}


</style>


  