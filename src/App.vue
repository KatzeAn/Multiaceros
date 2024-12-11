<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './presentation/components/NavBar.vue'
import SideBar from './presentation/components/SideBar.vue'
</script>

<template>

  <body class="flex flex-row">
    <nav v-if="!$route.meta.hideNavbar">
      <SideBar />
    </nav>

    <main class="w-full">
      <NavBar v-if="!$route.meta.hideNavbar" />
      <RouterView v-if="!$route.meta.hideNavbar" class="p-7"></RouterView>
      <RouterView v-if="$route.meta.hideNavbar" />
    </main>
  </body>
</template>

<style scoped>

  main {
    margin-left: 2rem;
    /* Mismo ancho inicial del aside */
    transition: margin-left 0.2s ease-out;
  }

  aside.is-expanded+main {
    margin-left: var(--sidebar-width);
    /* Ajusta al ancho expandido del aside */
  }

</style>
