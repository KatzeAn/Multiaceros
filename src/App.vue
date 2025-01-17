<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './presentation/components/NavBar.vue'
import SideBar from './presentation/components/SideBar.vue'
</script>

<template>

  <!-- <body class="flex flex-row">
    <nav v-if="!$route.meta.hideNavbar">
      <SideBar />
    </nav>

    <main class="w-full">
      <NavBar v-if="!$route.meta.hideNavbar" />
      <RouterView v-if="!$route.meta.hideNavbar" class="p-7"></RouterView>
      <RouterView v-if="$route.meta.hideNavbar" />
    </main>
  </body> -->

  <el-container>
    <el-aside width="64px">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header height="60px" class="no-margin-padding">
        <NavBar />
      </el-header>
      <el-main class="prueba no-margin-padding">
        <RouterView v-if="!$route.meta.hideNavbar" class="p-7"></RouterView>
        <RouterView v-if="$route.meta.hideNavbar" />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

  .no-margin-padding {
    margin: 0;
    padding: 0;
  }
</style>
