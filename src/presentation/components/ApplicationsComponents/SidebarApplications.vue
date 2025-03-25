<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#2A3D66"
    text-color="#fff">
    <el-menu-item>
      <el-icon><location /></el-icon>
      <span>{{ t('inicio') }}</span>
    </el-menu-item>

    <el-menu-item>
      <el-icon><icon-menu /></el-icon>
      <span>{{ t('miPerfil') }}</span>
    </el-menu-item>

    <el-menu-item>
      <el-icon><document /></el-icon>
      <span>{{ t('misPostulaciones') }}</span>
    </el-menu-item>

    <el-menu-item>
      <el-icon><setting /></el-icon>
      <span>{{ t('configuracion') }}</span>
    </el-menu-item>

    <el-menu-item index="5" @click="logout">
      <el-icon><el-icon><User /></el-icon></el-icon>
      <span>{{ t('portalEmpleados') }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Document, Menu as IconMenu, Location, Setting, User } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

const router = useRouter();
const logout = () => {
  router.push("/");
};
</script>