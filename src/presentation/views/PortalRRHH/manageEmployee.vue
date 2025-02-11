<template>
  <main>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="Empleados" name="gestionar-empleados">
        <router-view v-if="activeName === 'gestionar-empleados'" />
      </el-tab-pane>
      <el-tab-pane label="Departamentos" name="gestionar-departamentos">
        <router-view v-if="activeName === 'gestionar-departamentos'" />
      </el-tab-pane>
      <el-tab-pane label="Cargos" name="gestionar-cargos">
        <router-view v-if="activeName === 'gestionar-cargos'" />
      </el-tab-pane>
      <el-tab-pane label="Eps" name="gestionar-eps">
        <router-view v-if="activeName === 'gestionar-eps'" />
      </el-tab-pane>
      <el-tab-pane label="Arl" name="gestionar-arl">
        <router-view v-if="activeName === 'gestionar-arl'" />
      </el-tab-pane>
      <el-tab-pane label="Fondos de Pensión" name="gestionar-fondos-pension">
        <router-view v-if="activeName === 'gestionar-fondos-pension'" />
      </el-tab-pane>
      <el-tab-pane label="Fondos de Compensación" name="gestionar-fondos-compensacion">
        <router-view v-if="activeName === 'gestionar-fondos-compensacion'" />
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
  get: () => route.path.split("/").pop() || "gestionar-empleados",
  set: (value: string) => {
    router.push(`/portal-rrhh/empleados/${value}`);
  },
});
</script>
