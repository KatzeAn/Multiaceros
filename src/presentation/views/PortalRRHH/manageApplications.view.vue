<template>
  <main>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="Candidatos" name="gestionar-candidatos">
        <router-view v-if="activeName === 'gestionar-candidatos'" />
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const activeName = computed({
  get: () => route.path.split("/").pop() || "gestionar-candidatos",
  set: (value: string) => {
    router.push(`/portal-rrhh/aplicaciones/${value}`);
  },
});
</script>
