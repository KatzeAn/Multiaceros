<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#2A3D66"
    text-color="#fff">
    <el-menu-item >
      <el-icon><location /></el-icon>
      <span>Inicio</span>
    </el-menu-item>

    <el-menu-item>
      <el-icon><icon-menu /></el-icon>
      <span>Mi Perfil</span>
    </el-menu-item>

    <el-menu-item>
      <el-icon><document /></el-icon>
      <span>Mis Postulaciones</span>
    </el-menu-item>

    <el-menu-item>
      <el-icon><setting /></el-icon>
      <span>Configuración</span>
    </el-menu-item>

    <el-menu-item index="5" @click="logout">
      <el-icon><el-icon><User /></el-icon></el-icon>
      <span>Portal empleados</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Document, Menu as IconMenu, Location, Setting, User } from "@element-plus/icons-vue";

const router = useRouter();
const logout = () => {
  router.push("/");
};
</script>