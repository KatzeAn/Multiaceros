<template>
    <div class="flex items-center justify-center h-screen">
      <p class="text-xl font-semibold">Procesando autenticación...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";
  import { useAuthStore } from "@/presentation/stores/auth.store";
  import { onMounted } from "vue";
  
  const { handleGoogleCallback } = useAuthStore();
  const route = useRoute();
  const router = useRouter();
  
  onMounted(async () => {
  const code = route.query.code;

  if (!code || typeof code !== "string") {
    return;
  }

  try {
    await handleGoogleCallback(code);
    router.push("/home");
  } catch (error) {
  }
});

  </script>
  