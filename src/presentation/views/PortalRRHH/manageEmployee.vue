<template>
  <main>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="Empleados" name="gestionar-empleados">
        <router-view />
      </el-tab-pane>
      <el-tab-pane label="Departamentos" name="gestionar-departamentos">
        <router-view />
      </el-tab-pane>
      <el-tab-pane label="Cargos" name="gestionar-cargos">
        <router-view />
      </el-tab-pane>
      <el-tab-pane label="Eps" name="gestionar-eps">
        <router-view />
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
  get: () => route.path.split("/").pop() || "informacion-personal",
  set: (value: string) => {
    router.push(`/portal-rrhh/empleados/${value}`);
  },
});
</script>
