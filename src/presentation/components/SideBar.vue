<template>
  <div>
    <aside 
      v-if="!isSmallScreen" 
      :class="`${isExpanded ? 'is-expanded' : ''} ${isSmallScreen ? 'is-hidden' : ''}`">
      <div class="logo">
        <img src="../assets/Logo 1-.png" alt="logo">
      </div>

      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>

      <h3>Menu</h3>
      <div class="menu">
        <router-link class="button" to="/home">
          <span class="material-symbols-outlined">home</span>
          <span class="text">Inicio</span>
        </router-link>
        <router-link class="button" to="/certificados">
          <span class="material-symbols-outlined">analytics</span>
          <span class="text">Certificados</span>
        </router-link>
        <router-link class="button" to="/comprobantes">
          <span class="material-symbols-outlined">attach_money</span>
          <span class="text">Comprobantes</span>
        </router-link>
        <router-link class="button" to="/vacaciones">
          <span class="material-symbols-outlined">beach_access</span>
          <span class="text">Vacaciones y Ausencias</span>
        </router-link>

                <div>
          <div class="button" @click="togglePortal">
            <span class="material-symbols-outlined">group</span>
            <span class="text">Portal Recursos Humanos</span>
          </div>
          <div v-show="isPortalExpanded" class="dropdown">
            <router-link to="/portal-rrhh/gestionar-empleados">Gestionar Empleados</router-link>
            <router-link to="/portal-rrhh/gestionar-cumplimientos">Gestionar Certificados de Cumplimiento</router-link>
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
          <span class="text">Configuración</span>
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";

const isExpanded = ref(false);
const isSmallScreen = ref(window.innerWidth < 700);
const isPortalExpanded = ref(false);

const asideWidth = computed(() => {
  return isSmallScreen.value ? "0px" : isExpanded.value ? "305px" : "64px";
});

const ToggleMenu = () => {
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
    isPortalExpanded.value = false; // Cerrar el menú de recursos humanos cuando se cierra el menú principal
  }
};

const togglePortal = () => {
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
    width: calc(2rem + 32px);
    overflow: hidden;
    min-height: 100vh;
    padding: 1rem;

    background-color: var(--secondary-color);
    color: var(--light-color);

    transition: 0.2s ease-out;
}

aside .flex {
    flex: 1 1 0;
}

aside.is-expanded {
    width: var(--sidebar-width);
}

aside .logo {
    margin-bottom: 1rem;
}

aside .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;
}

aside .menu-toggle-wrap .menu-toggle {
    transition: 0.2s ease-out;
}

aside .menu-toggle-wrap .menu-toggle .material-symbols-outlined {
    font-size: 2rem;
    color: var(--light-color);
    transition: 0.2s ease-out;
}

aside .menu-toggle-wrap .menu-toggle:hover .material-symbols-outlined {
    color: var(--primary-color);
    transform: translateX(0.2rem);
}


aside .logo img {
    width: 2rem;
}

aside h3,
aside .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
}

aside h3 {
    color: var(--gray-color);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
}

aside .menu {
    margin: 0 -1rem;
}

aside .menu .button {
    display: flex;
    align-items: center;
    text-decoration: none;

    padding: 0.5rem 1rem;
    transition: 0.2s ease-out;
}

aside .menu .button .material-symbols-outlined {
    font-size: 2rem;
    color: var(--light-color);
    margin-right: 1rem;
    transition: 0.2s ease-out;
}

aside .menu .button .text {
    color: var(--light-color);
    transition: 0.2s ease-out;
}

aside .menu .button:hover,
.router-link-exact-active {
    background-color: var(--primary-alt-color);
}

.router-link-exact-active {
    border-right: 5px solid var(--primary-color);
}

aside .menu .button:hover .material-symbols-outlined,
aside .menu .button:hover .text {
    font-weight: bold;
    transition: 0.2s ease-out;
}


aside.is-expanded .menu-toggle-wrap {
    top: -3rem;
}

aside.is-expanded .menu-toggle-wrap .menu-toggle {
    transform: rotate(-180deg);
}

aside.is-expanded h3,
aside.is-expanded .button .text {
    opacity: 1;
}

aside.is-expanded button .material-symbols-outlined {
    margin-right: 1rem;
}

aside.is-hidden {
  width: 0;
  padding: 0; /* Opcional, para evitar que el padding ocupe espacio */
  overflow: hidden; /* Asegura que nada sea visible */
  transition: width 0.3s ease-out, padding 0.3s ease-out; /* Animación suave */
}
  
  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background-color: var(--secondary-color);
    padding: 0.5rem 0;
    z-index: 99;
  }
  
  .navbar .nav-item {
    text-decoration: none;
    color: var(--light-color);
    font-size: 1.5rem;
    transition: 0.3s ease;
  }
  
  .navbar .nav-item:hover {
    color: var(--primary-color);
  }
  .dropdown {
  margin-left: 2rem;
  padding: 0.5rem 0;
}
.dropdown a {
  display: block;
  padding: 0.3rem 0.5rem;
  color: #fff;
  text-decoration: none;
}
.dropdown a:hover {
  background-color: #4a90e2;
  font-weight: bold;
}
  </style>
  