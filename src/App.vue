<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./presentation/components/NavBar.vue";
import SideBar from "./presentation/components/SideBar.vue";
import { onMounted, onUnmounted, ref } from "vue";

const asideWidth = ref("258px"); // Valor inicial

import { useAuthStore } from "./presentation/stores/auth.store";

const authStore = useAuthStore();

const resetTimer = () => {
  authStore.resetInactivityTimer();
};

onMounted(() => {
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("click", resetTimer);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", resetTimer);
  window.removeEventListener("keydown", resetTimer);
  window.removeEventListener("click", resetTimer);
});

</script>

<template>
  <el-container>
    <el-aside :width="asideWidth" v-if="!$route.meta.hideNavbar">
      <SideBar @update:asideWidth="(width) => (asideWidth = width)" />
    </el-aside>
    <el-container>
      <el-header
        height="60px"
        class="no-margin-padding"
        v-if="!$route.meta.hideNavbar"
      >
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
.is-hidden {
  background-color: black;
}

.el-aside,
.el-main {
  transition: all 0.3s ease;
}
</style>
