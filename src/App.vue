<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./presentation/components/NavBar.vue";
import SideBar from "./presentation/components/SideBar.vue";
import ChatComponent from "@/presentation/components/chatBot.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import {useUserStore} from "@/presentation/stores/user.store";
import { useAuthStore } from "./presentation/stores/auth.store";

const isSmallScreen = ref(window.innerWidth < 800);

const handleResize = () => {
  isSmallScreen.value = window.innerWidth < 800;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const asideWidth = computed(() => {
    return isSmallScreen.value ? '0px' : '258px';
});
const isModalVisible = ref(false); 
const authStore = useAuthStore();
const userStore = useUserStore();
let interval: ReturnType<typeof setInterval>;

const resetTimer = () => {
  authStore.resetInactivityTimer();
};

const sendHeartbeat = async () => {
  try {
    if (!authStore.loginWithEmailAndPassword) {
      return;
    }
    await userStore.heartbeat();
  } catch (error) {
    console.error(error);
  }
};


onMounted(() => {
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("click", resetTimer);

  sendHeartbeat();
  interval = setInterval(() => {
    sendHeartbeat();
  }, 30000); // Cada 30 segundos
});

onUnmounted(() => {
  window.removeEventListener("mousemove", resetTimer);
  window.removeEventListener("keydown", resetTimer);
  window.removeEventListener("click", resetTimer);
  clearInterval(interval);
});
</script>

<template>
  <el-container>
    <el-aside :width="asideWidth" v-if="!$route.meta.hideNavbar">
      <SideBar @update:asideWidth="(width) => (asideWidth = width)" />
    </el-aside>
    <el-container>
      <el-header height="60px" class="no-margin-padding" v-if="!$route.meta.hideNavbar">
        <NavBar />
      </el-header>
      <el-main class="prueba no-margin-padding">
        <RouterView v-if="!$route.meta.hideNavbar" class="p-7"></RouterView>
        <RouterView v-if="$route.meta.hideNavbar" />
      </el-main>
    </el-container>
    <img 
      src="@/presentation/assets/avatar.png" 
      alt="Chat"  
      class="fixed bottom-5 right-5 w-16 h-16 rounded-full cursor-pointer shadow-lg"
      @click="isModalVisible = true"
    />
    <div v-show="isModalVisible" class="fixed bottom-20 right-5 bg-white rounded-lg shadow-lg p-4 z-50">
      <ChatComponent @closeChat="isModalVisible = false" />
    </div>
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