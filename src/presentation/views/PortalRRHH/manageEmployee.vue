<template>
  <main>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane :label="t('employees')" name="gestionar-empleados">
        <router-view v-if="activeName === 'gestionar-empleados'" />
      </el-tab-pane>
      <el-tab-pane :label="t('departments')" name="gestionar-departamentos">
        <router-view v-if="activeName === 'gestionar-departamentos'" />
      </el-tab-pane>
      <el-tab-pane :label="t('jobs')" name="gestionar-cargos">
        <router-view v-if="activeName === 'gestionar-cargos'" />
      </el-tab-pane>
      <el-tab-pane :label="t('eps')" name="gestionar-eps">
        <router-view v-if="activeName === 'gestionar-eps'" />
      </el-tab-pane>
      <el-tab-pane :label="t('arl')" name="gestionar-arl">
        <router-view v-if="activeName === 'gestionar-arl'" />
      </el-tab-pane>
      <el-tab-pane :label="t('pensionFunds')" name="gestionar-fondos-pension">
        <router-view v-if="activeName === 'gestionar-fondos-pension'" />
      </el-tab-pane>
      <el-tab-pane
        :label="t('compensationFunds')"
        name="gestionar-fondos-compensacion"
      >
        <router-view v-if="activeName === 'gestionar-fondos-compensacion'" />
      </el-tab-pane>
      <el-tab-pane
        :label="t('severanceFunds')"
        name="gestionar-fondos-cesantias"
      >
        <router-view v-if="activeName === 'gestionar-fondos-cesantias'" />
      </el-tab-pane>
      <el-tab-pane :label="t('benefits')" name="gestionar-beneficios">
        <router-view v-if="activeName === 'gestionar-beneficios'" />
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const route = useRoute();
const router = useRouter();

const activeName = computed({
  get: () => route.path.split("/").pop() || "gestionar-empleados",
  set: (value: string) => {
    router.push(`/portal-rrhh/empleados/${value}`);
  },
});
</script>
